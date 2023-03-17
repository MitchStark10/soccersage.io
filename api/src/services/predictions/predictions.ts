import type {
    MutationResolvers,
    PredictionResolvers,
    QueryResolvers,
} from 'types/graphql';

import { RedwoodGraphQLError } from '@redwoodjs/graphql-server';

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

interface ScoreData {
    score: number;
    correctWins: number;
    correctTies: number;
}

const checkIfGameIsInFuture = async (gameId: number) => {
    if (!gameId) {
        throw new RedwoodGraphQLError(
            'Could not validate game start time with missing game id'
        );
    }
    const game = await db.game.findUnique({ where: { id: gameId } });

    return new Date(game?.startDateTime) > new Date();
};

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
            const { score, correctTies, correctWins } =
                predictions.reduce<ScoreData>(
                    (acc, prediction) => {
                        const predictionStatus =
                            getPredictionStatus(prediction);
                        switch (predictionStatus) {
                            case PREDICTION_STATUS.correctWin:
                                return {
                                    score: acc.score + 3,
                                    correctWins: acc.correctWins + 1,
                                    correctTies: acc.correctTies,
                                };
                            case PREDICTION_STATUS.correctTie:
                                return {
                                    score: acc.score + 2,
                                    correctWins: acc.correctWins,
                                    correctTies: acc.correctTies + 1,
                                };
                            default:
                                return acc;
                        }
                    },
                    { score: 0, correctWins: 0, correctTies: 0 }
                );

            return {
                email,
                username,
                userId,
                score,
                correctTies,
                correctWins,
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

    for (const prediction of predictions.filter(
        (prediction) => prediction.game.isCompleted
    )) {
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

export const createPrediction: MutationResolvers['createPrediction'] = async ({
    input,
}) => {
    const isGameInFuture = await checkIfGameIsInFuture(input.gameId);
    if (!isGameInFuture) {
        throw new RedwoodGraphQLError(
            'Cannot make a prediction for a game that has already started'
        );
    }
    return db.prediction.create({
        data: input,
    });
};

export const updatePrediction: MutationResolvers['updatePrediction'] = async ({
    id,
    input,
}) => {
    const currentPrediction = await db.prediction.findUnique({
        where: { id },
    });

    const isGameInFuture = await checkIfGameIsInFuture(
        currentPrediction.gameId
    );

    if (!isGameInFuture) {
        throw new RedwoodGraphQLError(
            'Cannot make a prediction for a game that has already started'
        );
    }

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
