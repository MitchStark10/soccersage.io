import { getFirstUserFromContext } from 'src/lib/auth';
import { db } from 'src/lib/db';
import type {
    Game,
    MutationResolvers,
    Prediction as PredictionType,
    PredictionResolvers,
    QueryResolvers,
    User,
} from 'types/graphql';

type PartialGame = Omit<
    Game,
    'homeTeam' | 'awayTeam' | 'predictions' | 'season'
>;
type PartialUser = Omit<User, 'predictions' | 'resetTokenExpiresAt'>;

type PartialPrediction = Omit<PredictionType, 'game' | 'user'> & {
    game: PartialGame;
    user: PartialUser;
};

//TODO: Re-use these functions from the PredictionCard
const getWinningTeamId = (game: PartialGame) => {
    if (game.homeTeamScore > game.awayTeamScore) {
        return game.homeTeamId;
    } else if (game.awayTeamScore > game.homeTeamScore) {
        return game.awayTeamId;
    }

    return null;
};

const getPredictionStatus = (
    prediction: PartialPrediction
): 'incomplete' | 'correct' | 'incorrect' => {
    if (!prediction.game.isCompleted) {
        return 'incomplete';
    }

    const winningTeamId = getWinningTeamId(prediction.game);

    return winningTeamId === prediction.teamId ? 'correct' : 'incorrect';
};

export const standings: QueryResolvers['standings'] = async ({ seasonId }) => {
    const predictions = await db.prediction.findMany({
        where: { seasonId },
        include: {
            game: true,
            user: true,
        },
    });

    const userPredictionMap = predictions.reduce<{
        [key: string]: PartialPrediction[];
    }>((acc, prediction) => {
        if (acc[prediction.userId]) {
            acc[prediction.userId].push(prediction);
        } else {
            acc[prediction.userId] = [prediction];
        }

        return acc;
    }, {});

    // TODO: Define the exact scoring algorithm that we would like to use
    const userIdRankings = Object.entries(userPredictionMap).map(
        ([userId, predictions]) => {
            const email = predictions[0].user.email;
            const score = predictions.reduce<number>((acc, prediction) => {
                const predictionStatus = getPredictionStatus(prediction);
                switch (predictionStatus) {
                    case 'correct':
                        return acc + 1;
                    default:
                        return acc;
                }
            }, 0);

            return {
                email,
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

export const myPredictions: QueryResolvers['myPredictions'] = (
    _temp,
    { context }
) => {
    const user = getFirstUserFromContext(context);
    return db.prediction.findMany({
        where: { userId: user.id },
    });
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
    team: (_obj, { root }) =>
        db.prediction.findUnique({ where: { id: root.id } }).team(),
    game: (_obj, { root }) =>
        db.prediction.findUnique({ where: { id: root.id } }).game(),
};
