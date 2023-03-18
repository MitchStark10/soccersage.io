import { Game, Prediction, User } from 'types/graphql';

type PartialUser = Omit<User, 'predictions' | 'resetTokenExpiresAt'>;

type PartialGame = Omit<
    Game,
    'homeTeam' | 'awayTeam' | 'predictions' | 'season'
>;

export type PartialPrediction = Omit<Prediction, 'game' | 'user'> & {
    game: PartialGame;
    user: PartialUser;
};

export const PREDICTION_STATUS = {
    correctWin: 'correctWin',
    correctTie: 'correctTie',
    incorrect: 'incorrect',
    pending: 'pending',
};

const getWinningTeamId = (game: PartialGame) => {
    if (game.homeTeamScore > game.awayTeamScore) {
        return game.homeTeamId;
    } else if (game.awayTeamScore > game.homeTeamScore) {
        return game.awayTeamId;
    }

    return null;
};

export const getPredictionStatus = (prediction: PartialPrediction) => {
    if (!prediction.game) {
        throw 'Prediction must have a game';
    }

    if (!prediction.game.isCompleted) {
        return PREDICTION_STATUS.pending;
    }

    const winningTeamId = getWinningTeamId(prediction.game);

    if (
        winningTeamId === null &&
        prediction.prediction.toLowerCase() === 'tie'
    ) {
        return PREDICTION_STATUS.correctTie;
    }

    return winningTeamId === prediction.teamId
        ? PREDICTION_STATUS.correctTie
        : PREDICTION_STATUS.incorrect;
};
