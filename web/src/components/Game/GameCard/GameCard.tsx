import { useState } from 'react';

import { Game, Prediction } from 'types/graphql';

import { useAuth } from '@redwoodjs/auth';
import { navigate, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';

import { CardContainer } from 'src/components/Core/Card/CardContainer';
import { Button } from 'src/components/Core/Form/Button';
import { Text } from 'src/components/Core/Text/Text';

interface Props {
    game: Game;
    prediction?: Prediction | null;
}

const CREATE_PREDICTION_MUTATION = gql`
    mutation CreatePredictionMutation($input: CreatePredictionInput!) {
        createPrediction(input: $input) {
            id
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
        }
    }
`;

let timeout = null;

export const GameCard: React.VFC<Props> = ({ game, prediction }) => {
    const { currentUser } = useAuth();
    const [createPrediction] = useMutation(CREATE_PREDICTION_MUTATION);
    const [updatePrediction] = useMutation(UPDATE_PREDICTION_MUTATION);
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

        setLocalPredictedWinner(teamId ?? -1);
        setLocalPredictionResult(newPrediction);

        if (timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(async () => {
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
        }, 500);
    };

    const predictedWinningTeam = localPredictedWinner ?? prediction?.teamId;
    const predictionResult =
        localPredictionResult?.toUpperCase() ??
        prediction?.prediction?.toUpperCase();

    return (
        <CardContainer className="w-full">
            <Text As="h6">
                {game.homeTeam.name} vs {game.awayTeam.name}
            </Text>
            <div className="grid gap-y-2 flex-col justify-between items-center mt-4">
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
