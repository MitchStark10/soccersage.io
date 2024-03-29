import { navigate, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import GameForm from 'src/components/Game/GameForm';

const CREATE_GAME_MUTATION = gql`
    mutation CreateGameMutation($input: CreateGameInput!) {
        createGame(input: $input) {
            id
        }
    }
`;

const NewGame = () => {
    const [createGame, { loading, error }] = useMutation(CREATE_GAME_MUTATION, {
        onCompleted: () => {
            toast.success('Game created');
            navigate(routes.games());
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const onSave = (input) => {
        const castInput = Object.assign(input, {
            homeTeamId: parseInt(input.homeTeamId),
            awayTeamId: parseInt(input.awayTeamId),
        });
        createGame({ variables: { input: castInput } });
    };

    return (
        <div className="rw-segment">
            <header className="rw-segment-header">
                <h2 className="rw-heading rw-heading-secondary">New Game</h2>
            </header>
            <div className="rw-segment-main">
                <GameForm onSave={onSave} loading={loading} error={error} />
            </div>
        </div>
    );
};

export default NewGame;
