import { Alignment } from 'types/alignment';
import { Game, Prediction, Team } from 'types/graphql';

import { CardContainer } from 'src/components/Core/Card/CardContainer';
import { Text } from 'src/components/Core/Text/Text';
// import { getPredictionStatus } from 'src/utils/get-prediction-status';

interface Props {
    prediction: Prediction;
}

interface TeamProps {
    team: Team;
    imageFocus: 'left' | 'right';
    align: Alignment;
}

const TeamText: React.FC<TeamProps> = ({ team, imageFocus, align }) => {
    return (
        <Text textAlign={align}>
            {imageFocus === 'left' && team.logoUrl && (
                <img src={team.logoUrl} alt={team.name} />
            )}
            {team.name}
            {imageFocus === 'right' && team.logoUrl && (
                <img src={team.logoUrl} alt={team.name} />
            )}
        </Text>
    );
};

const GameDisplay: React.FC<{ game: Game }> = ({ game }) => {
    return (
        <div className="grid grid-cols-3 w-full items-center">
            <TeamText align="center" team={game.homeTeam} imageFocus={'left'} />
            <Text textAlign="center" variant="caption">
                {game.isCompleted
                    ? 'FT'
                    : new Date(game.startDateTime).toLocaleDateString()}{' '}
            </Text>
            <TeamText
                align="center"
                team={game.awayTeam}
                imageFocus={'right'}
            />
        </div>
    );
};

export const PredictionCard: React.VFC<Props> = ({ prediction }) => {
    // const predictedTie = prediction.prediction.toUpperCase() === 'TIE';
    // const predictionStatus = getPredictionStatus(prediction);

    return (
        <CardContainer className={'border-2 bg-white shadow-md'}>
            <GameDisplay game={prediction.game} />
        </CardContainer>
    );
};
