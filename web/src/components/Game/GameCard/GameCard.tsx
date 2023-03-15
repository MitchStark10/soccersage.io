import { useState } from 'react';

import { Game, Prediction } from 'types/graphql';

import { useAuth } from '@redwoodjs/auth';
import { navigate, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import { CardContainer } from 'src/components/Core/Card/CardContainer';
import { Button } from 'src/components/Core/Form/Button';
import { CheckPill } from 'src/components/Core/Pill/CheckPill';
import { Text } from 'src/components/Core/Text/Text';
import { formatDatetimeForUser } from 'src/utils/format-datetime-for-user';

interface Props {
    game: Game;
    prediction?: Prediction | null;
}

const CREATE_PREDICTION_MUTATION = gql`
    mutation CreatePredictionMutation($input: CreatePredictionInput!) {
        createPrediction(input: $input) {
            id
            teamId
            prediction
        }
    }
`;

const UPDATE_PREDICTION_MUTATION = gql`
    mutation UpdatePredictionMutation(
        $id: Int!
        $input: UpdatePredictionInput!
    ) {
        updatePrediction(id: $id, input: $input) {
            id
            teamId
            prediction
        }
    }
`;

export const GameCard: React.VFC<Props> = ({ game, prediction }) => {
    // TODO: Use Apollo error here
    const handleError = (error: any) => {
        console.error(error);
        toast.error(
            error?.message || 'An error occurred. Please try again later.'
        );
    };
    const handleSuccess = (response) => {
        // TODO: Use the teamId and prediction for setter calls. Then clean up the code
        console.log(response);
    };

    const apiOptions = {
        onCompleted: handleSuccess,
        onError: handleError,
    };

    const { currentUser } = useAuth();
    const [createPrediction] = useMutation(
        CREATE_PREDICTION_MUTATION,
        apiOptions
    );
    const [updatePrediction] = useMutation(
        UPDATE_PREDICTION_MUTATION,
        apiOptions
    );
    const [localPredictedWinner, setLocalPredictedWinner] = useState<
        number | null
    >(null);
    const [localPredictionResult, setLocalPredictionResult] = useState<
        string | null
    >(null);

    const makePrediction = async (
        newPrediction: 'tie' | 'win',
        teamId: number | null
    ) => {
        if (!currentUser?.id) {
            navigate(routes.login());
            return;
        }

        if (prediction?.id) {
            await updatePrediction({
                variables: {
                    id: prediction.id,
                    input: {
                        prediction: newPrediction,
                        teamId,
                    },
                },
            });
        } else {
            await createPrediction({
                variables: {
                    input: {
                        userId: currentUser.id,
                        gameId: game.id,
                        prediction: newPrediction,
                        seasonId: game.seasonId,
                        teamId,
                    },
                },
            });
        }

        // TODO: These are still running even when the call fails
        setLocalPredictedWinner(teamId ?? -1);
        setLocalPredictionResult(newPrediction);
    };

    const predictedWinningTeam = localPredictedWinner ?? prediction?.teamId;
    const predictionResult =
        localPredictionResult?.toUpperCase() ??
        prediction?.prediction?.toUpperCase();

    return (
        <CardContainer className="w-full">
            <div className="flex justify-center gap-4 items-center w-full">
                <Text As="h6">
                    {game.homeTeam.name} vs {game.awayTeam.name}
                </Text>
                {predictionResult && <CheckPill variant="info" />}
            </div>

            <Text>
                {formatDatetimeForUser(game.startDateTime, {
                    includeWeekday: true,
                })}
            </Text>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 justify-between items-center mt-5">
                <Button
                    variant={
                        predictedWinningTeam === game.homeTeamId
                            ? 'primary'
                            : 'secondary'
                    }
                    onClick={() => makePrediction('win', game.homeTeamId)}
                >
                    {game.homeTeam.name}
                    {game.homeTeam.logoUrl ? (
                        <img
                            src={game.homeTeam.logoUrl}
                            alt={game.homeTeam.name}
                        />
                    ) : null}
                </Button>
                <Button
                    variant={
                        predictionResult === 'TIE' ? 'primary' : 'secondary'
                    }
                    onClick={() => makePrediction('tie', null)}
                >
                    Tie
                </Button>
                <Button
                    variant={
                        predictedWinningTeam === game.awayTeamId
                            ? 'primary'
                            : 'secondary'
                    }
                    onClick={() => makePrediction('win', game.awayTeamId)}
                >
                    {game.awayTeam.name}
                </Button>
            </div>
        </CardContainer>
    );
};
