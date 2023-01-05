import { Game, Prediction } from 'types/graphql';

type PartialGame = Omit<
    Game,
    'homeTeam' | 'awayTeam' | 'predictions' | 'season'
>;

// TODO: RedwoodJS doesn't appear to have good code sharing between the API and web sides.
// Ideally, this code (which is identically to a file on the API side) would be shared between the two.
export type PartialPrediction = Omit<Prediction, 'game' | 'user'> & {
    game: PartialGame;
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
