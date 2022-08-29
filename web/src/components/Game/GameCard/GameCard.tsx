import { Game, Prediction } from 'types/graphql';
import { CardContainer } from 'src/components/Core/Card/CardContainer';
import { Button } from 'src/components/Core/Form/Button';
import { H6 } from 'src/components/Core/Text/H6';
import { useMutation } from '@redwoodjs/web';
import { useAuth } from '@redwoodjs/auth';
import { navigate, routes } from '@redwoodjs/router';

interface Props {
    game: Game;
    refetchPredictions: () => void;
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

export const GameCard: React.VFC<Props> = ({
    game,
    prediction,
    refetchPredictions,
}) => {
    const { currentUser } = useAuth();
    const [createPrediction] = useMutation(CREATE_PREDICTION_MUTATION);
    const [updatePrediction] = useMutation(UPDATE_PREDICTION_MUTATION);

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

        refetchPredictions();
    };

    return (
        <CardContainer className="w-full">
            <H6>
                {game.homeTeam.name} vs {game.awayTeam.name}
            </H6>
            <div className="grid gap-y-2 flex-col justify-between items-center mt-4">
                <Button
                    variant={
                        prediction?.teamId === game.homeTeamId
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
                        prediction?.prediction?.toUpperCase() === 'TIE'
                            ? 'primary'
                            : 'secondary'
                    }
                    onClick={() => makePrediction('tie', null)}
                >
                    Tie
                </Button>
                <Button
                    variant={
                        prediction?.teamId === game.awayTeamId
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
