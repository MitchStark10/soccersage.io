import classNames from 'classnames';
import { Alignment } from 'types/alignment';
import { Game, Prediction, Team } from 'types/graphql';

import { CardContainer } from 'src/components/Core/Card/CardContainer';
import { Pill } from 'src/components/Core/Pill/Pill';
import { Text } from 'src/components/Core/Text/Text';
import { Check } from 'src/components/Icons/Check';
import { X } from 'src/components/Icons/X';
import { getPredictionStatus } from 'src/utils/get-prediction-status';

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
    const isGameInFuture = new Date(game.startDateTime) > new Date();

    return (
        <div className="grid grid-cols-3 w-full md:w-3/4 items-center">
            <TeamText align="left" team={game.homeTeam} imageFocus={'right'} />
            <Text
                variant="caption"
                textAlign="center"
                className="flex flex-col items-center gap-2"
            >
                {game.isCompleted
                    ? 'FT'
                    : new Date(game.startDateTime).toLocaleDateString()}{' '}
                {isGameInFuture && <Pill variant="info">Upcoming</Pill>}
            </Text>
            <TeamText align="right" team={game.awayTeam} imageFocus={'left'} />
        </div>
    );
};

export const PredictionCard: React.VFC<Props> = ({ prediction }) => {
    const predictedTie = prediction.prediction.toUpperCase() === 'TIE';
    const predictionStatus = getPredictionStatus(prediction);
    const pillVariant =
        predictionStatus === 'correct'
            ? 'success'
            : predictionStatus === 'incorrect'
            ? 'failure'
            : 'info';

    return (
        <CardContainer className={'border bg-white shadow-md'}>
            <GameDisplay game={prediction.game} />
            <Text
                className="flex w-full md:w-3/4 mt-6 justify-between items-center"
                textAlign="left"
            >
                <span>
                    You predicted{' '}
                    {predictedTie ? (
                        <b>a tie</b>
                    ) : (
                        <>
                            <b>{prediction.team.name}</b> to win
                        </>
                    )}
                </span>
                {predictionStatus !== 'incomplete' && (
                    <Pill
                        variant={pillVariant}
                        className={classNames('py-0.5 rounded-circle', {
                            'px-1.5': predictionStatus === 'correct',
                            'px-2': predictionStatus === 'incorrect',
                        })}
                    >
                        {predictionStatus === 'correct' && <Check />}
                        {predictionStatus === 'incorrect' && <X />}
                    </Pill>
                )}
            </Text>
        </CardContainer>
    );
};
