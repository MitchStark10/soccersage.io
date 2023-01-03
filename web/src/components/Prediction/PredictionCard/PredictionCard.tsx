import classNames from 'classnames';
import { Prediction } from 'types/graphql';
import { getPredictionStatus } from 'utilities/get-prediction-status';

import { CardContainer } from 'src/components/Core/Card/CardContainer';
import { H6 } from 'src/components/Core/Text/H6';
import { Text } from 'src/components/Core/Text/Text';

interface Props {
    prediction: Prediction;
}

export const PredictionCard: React.VFC<Props> = ({ prediction }) => {
    const predictedTie = prediction.prediction.toUpperCase() === 'TIE';
    const predictionStatus = getPredictionStatus(prediction);

    return (
        <CardContainer
            className={classNames('border-2', {
                'border-success-green': predictionStatus === 'correct',
                'border-error-red': predictionStatus === 'incorrect',
            })}
        >
            <H6 className="my-0">
                {prediction.game.homeTeam.logoUrl ? (
                    <img
                        src={prediction.game.homeTeam.logoUrl}
                        alt={prediction.game.homeTeam.name}
                    />
                ) : null}
                {prediction.game.homeTeam.name} vs{' '}
                {prediction.game.awayTeam.name}
            </H6>
            {prediction.game.isCompleted ? (
                <Text>
                    {prediction.game.homeTeamScore} -{' '}
                    {prediction.game.awayTeamScore}
                </Text>
            ) : null}
            {predictedTie ? (
                <Text>Prediction: Tie</Text>
            ) : (
                <Text>Prediction Winner: {prediction.team.name}</Text>
            )}
        </CardContainer>
    );
};
