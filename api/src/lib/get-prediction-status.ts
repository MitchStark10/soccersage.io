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

const getWinningTeamId = (game: PartialGame) => {
    if (game.homeTeamScore > game.awayTeamScore) {
        return game.homeTeamId;
    } else if (game.awayTeamScore > game.homeTeamScore) {
        return game.awayTeamId;
    }

    return null;
};

export const getPredictionStatus = (prediction: PartialPrediction) => {
    console.log('prediction', prediction);
    if (!prediction.game) {
        throw 'Prediction must have a game';
    }

    if (!prediction.game.isCompleted) {
        return 'incomplete';
    }

    const winningTeamId = getWinningTeamId(prediction.game);

    return winningTeamId === prediction.teamId ? 'correct' : 'incorrect';
};
