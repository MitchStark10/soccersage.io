import { Game } from '../api/types/graphql';

export type PartialGame = Omit<
    Game,
    'homeTeam' | 'awayTeam' | 'predictions' | 'season'
>;

export const getWinningTeamId = (game: PartialGame) => {
    if (game.homeTeamScore > game.awayTeamScore) {
        return game.homeTeamId;
    } else if (game.awayTeamScore > game.homeTeamScore) {
        return game.awayTeamId;
    }

    return null;
};
