import { Prediction } from 'types/graphql';

interface Props {
    prediction: Prediction;
}

export const PredictionCard: React.VFC<Props> = ({ prediction }) => {
    const predictedTie = prediction.prediction === 'Tie';
    return (
        <div className="border-gray border rounded flex flex-col justify-start items-center w-fit p-4">
            {prediction.game.homeTeam.name} vs {prediction.game.awayTeam.name}
            {predictedTie ? (
                <p>Prediction: Tie</p>
            ) : (
                <p>Prediction Winner: {prediction.team.name}</p>
            )}
        </div>
    );
};
