import { Game, Prediction } from 'types/graphql';

import { CardContainer } from 'src/components/Core/Card/CardContainer';
import { CheckPill } from 'src/components/Core/Pill/CheckPill';
import { Pill } from 'src/components/Core/Pill/Pill';
import { XPill } from 'src/components/Core/Pill/XPill';
import { TeamText } from 'src/components/Core/Text/TeamText';
import { Text } from 'src/components/Core/Text/Text';
import { formatDatetimeForUser } from 'src/utils/format-datetime-for-user';
import {
    getPredictionStatus,
    PREDICTION_STATUS,
} from 'src/utils/get-prediction-status';

interface Props {
    prediction: Prediction;
}

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
                {game.isCompleted ? (
                    <>
                        <div className="font-bold text-3xl">
                            {game.homeTeamScore} - {game.awayTeamScore}
                        </div>
                        FT
                    </>
                ) : (
                    formatDatetimeForUser(game.startDateTime)
                )}{' '}
                {isGameInFuture && <Pill variant="info">Upcoming</Pill>}
            </Text>
            <TeamText align="right" team={game.awayTeam} imageFocus={'left'} />
        </div>
    );
};

export const PredictionCard: React.VFC<Props> = ({ prediction }) => {
    const predictedTie = prediction.prediction.toUpperCase() === 'TIE';
    const predictionStatus = getPredictionStatus(prediction);

    return (
        <CardContainer className={'border shadow-md'}>
            <GameDisplay game={prediction.game} />
            <Text
                className="flex w-full md:w-3/4 mt-6 justify-center items-center gap-3"
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
                {predictionStatus === PREDICTION_STATUS.correctWin ||
                    (predictionStatus === PREDICTION_STATUS.correctTie && (
                        <CheckPill variant="success" />
                    ))}
                {predictionStatus === PREDICTION_STATUS.incorrect && (
                    <XPill variant="failure" />
                )}
            </Text>
        </CardContainer>
    );
};
