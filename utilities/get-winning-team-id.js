module.exports = {
    getWinningTeamId: (game) => {
        if (game.homeTeamScore > game.awayTeamScore) {
            return game.homeTeamId;
        } else if (game.awayTeamScore > game.homeTeamScore) {
            return game.awayTeamId;
        }

        return null;
    },
};
