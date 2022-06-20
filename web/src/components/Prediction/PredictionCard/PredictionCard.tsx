import { Prediction } from 'types/graphql';

interface Props {
    prediction: Prediction;
}

export const PredictionCard: React.VFC<Props> = ({ prediction }) => {
    const predictedTie = prediction.prediction === 'Tie';
    return (
        <div>
            {prediction.game.homeTeam.name} vs {prediction.game.awayTeam.name}
            {predictedTie ? (
                <p>Prediction: Tie</p>
            ) : (
                <p>Prediction Winner: {prediction.team.name}</p>
            )}
        </div>
    );
};
