// CommonJS is utilized because that seems to be the only way to satisfy the build
// steps of both the api and web submodules.
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
