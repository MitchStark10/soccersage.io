const { getWinningTeamId } = require('./get-winning-team-id');

module.exports = {
    getPredictionStatus: (prediction) => {
        console.log('prediction', prediction);
        if (!prediction.game) {
            throw 'Prediction must have a game';
        }

        if (!prediction.game.isCompleted) {
            return 'incomplete';
        }

        const winningTeamId = getWinningTeamId(prediction.game);

        return winningTeamId === prediction.teamId ? 'correct' : 'incorrect';
    },
};
