import { CardContainer } from 'src/components/Core/Card/CardContainer';
import { H6 } from 'src/components/Core/Text/H6';
import { Text } from 'src/components/Core/Text/Text';
import { Prediction } from 'types/graphql';

interface Props {
    prediction: Prediction;
}

export const PredictionCard: React.VFC<Props> = ({ prediction }) => {
    const predictedTie = prediction.prediction.toUpperCase() === 'TIE';
    return (
        <CardContainer>
            <H6>
                {prediction.game.homeTeam.name} vs{' '}
                {prediction.game.awayTeam.name}
            </H6>
            {predictedTie ? (
                <Text>Prediction: Tie</Text>
            ) : (
                <Text>Prediction Winner: {prediction.team.name}</Text>
            )}
        </CardContainer>
    );
};
