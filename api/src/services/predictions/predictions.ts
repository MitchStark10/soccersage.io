import type {
    MutationResolvers,
    PredictionResolvers,
    QueryResolvers,
} from 'types/graphql';

import { getFirstUserFromContext } from 'src/lib/auth';
import { db } from 'src/lib/db';
import {
    getPredictionStatus,
    PartialPrediction,
    PREDICTION_STATUS,
} from 'src/lib/get-prediction-status';

interface UserPredictionMap {
    [key: string]: PartialPrediction[];
}

export const standings: QueryResolvers['standings'] = async ({ seasonId }) => {
    // TODO: This logic finds all predictions, and includes the associated game for each prediction.
    // While this works with small amounts of data, this will not scale very well, due to the
    // re-retrieval of game data for each prediction.
    // Other options to consider if/when more users join:
    // 1. - Query for all predictions in a season and all games in a season concurrently.
    //   a. - This is still not as performant as possible, but would reduce duplicate data and retain live standings.
    // 2. - Store standings in a separate schema, and have a CRON job that updates them once an hour.
    //   a. - This would allow for a much more performant solution, but would remove the ability to have live standings.
    const predictions: PartialPrediction[] = await db.prediction.findMany({
        where: { seasonId },
        include: {
            game: true,
            user: true,
        },
    });

    const userPredictionMap = predictions.reduce<UserPredictionMap>(
        (acc, prediction) => {
            if (acc[prediction.userId]) {
                acc[prediction.userId].push(prediction);
            } else {
                acc[prediction.userId] = [prediction];
            }

            return acc;
        },
        {}
    );

    const userIdRankings = Object.entries(userPredictionMap).map(
        ([userId, predictions]: [string, PartialPrediction[]]) => {
            const { email, username } = predictions[0].user;
            const score = predictions.reduce<number>((acc, prediction) => {
                const predictionStatus = getPredictionStatus(prediction);
                switch (predictionStatus) {
                    case PREDICTION_STATUS.correctWin:
                        return acc + 3;
                    case PREDICTION_STATUS.correctTie:
                        return acc + 2;
                    default:
                        return acc;
                }
            }, 0);

            return {
                email,
                username,
                userId,
                score,
            };
        }
    );

    return {
        userIdRankings,
    };
};

export const predictions: QueryResolvers['predictions'] = () => {
    return db.prediction.findMany();
};

export const myPredictions: QueryResolvers['myPredictions'] = async (
    _temp,
    { context }
) => {
    const user = getFirstUserFromContext(context);
    // TODO: Ideally, we'd like to be able to display the user's current place in the standings
    // but that would require us to recalculate the standings for all users. Until there's a more performant solution,
    // this idea will remain in the backlog
    const predictions = await db.prediction.findMany({
        where: { userId: user.id },
        include: {
            game: true,
            user: true,
        },
        orderBy: { game: { startDateTime: 'desc' } },
    });

    let streakCount = 0;

    for (const prediction of predictions) {
        const predictionStatus = getPredictionStatus(prediction);
        if (
            predictionStatus === PREDICTION_STATUS.correctWin ||
            predictionStatus === PREDICTION_STATUS.correctTie
        ) {
            streakCount++;
        } else {
            break;
        }
    }

    console.log('returning predictions', predictions);

    return {
        streakCount,
        predictions,
    };
};

export const prediction: QueryResolvers['prediction'] = ({ id }) => {
    return db.prediction.findUnique({
        where: { id },
    });
};

export const createPrediction: MutationResolvers['createPrediction'] = ({
    input,
}) => {
    return db.prediction.create({
        data: input,
    });
};

export const updatePrediction: MutationResolvers['updatePrediction'] = ({
    id,
    input,
}) => {
    return db.prediction.update({
        data: input,
        where: { id },
    });
};

export const deletePrediction: MutationResolvers['deletePrediction'] = ({
    id,
}) => {
    return db.prediction.delete({
        where: { id },
    });
};

export const Prediction: PredictionResolvers = {
    id: (_obj, { root }) => root.id,
    teamId: (_obj, { root }) => root.teamId,
    gameId: (_obj, { root }) => root.gameId,
    userId: (_obj, { root }) => root.userId,
    prediction: (_obj, { root }) => root.prediction,
    user: (_obj, { root }) =>
        db.user.findUnique({ where: { id: root.userId } }),
    team: (_obj, { root }) =>
        db.prediction.findUnique({ where: { id: root.id } }).team(),
    game: (_obj, { root }) =>
        db.prediction.findUnique({ where: { id: root.id } }).game(),
};
