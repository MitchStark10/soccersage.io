import { Link, routes, navigate } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

const DELETE_GAME_MUTATION = gql`
    mutation DeleteGameMutation($id: Int!) {
        deleteGame(id: $id) {
            id
        }
    }
`;

const checkboxInputTag = (checked) => {
    return <input type="checkbox" checked={checked} disabled />;
};

const Game = ({ game }) => {
    const [deleteGame] = useMutation(DELETE_GAME_MUTATION, {
        onCompleted: () => {
            toast.success('Game deleted');
            navigate(routes.games());
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const onDeleteClick = (id) => {
        if (confirm('Are you sure you want to delete game ' + id + '?')) {
            deleteGame({ variables: { id } });
        }
    };

    return (
        <>
            <div className="rw-segment">
                <header className="rw-segment-header">
                    <h2 className="rw-heading rw-heading-secondary">
                        Game {game.id} Detail
                    </h2>
                </header>
                <table className="rw-table">
                    <tbody>
                        <tr>
                            <th>Id</th>
                            <td>{game.id}</td>
                        </tr>
                        <tr>
                            <th>Home team id</th>
                            <td>{game.homeTeamId}</td>
                        </tr>
                        <tr>
                            <th>Away team id</th>
                            <td>{game.awayTeamId}</td>
                        </tr>
                        <tr>
                            <th>Home team score</th>
                            <td>{game.homeTeamScore}</td>
                        </tr>
                        <tr>
                            <th>Away team score</th>
                            <td>{game.awayTeamScore}</td>
                        </tr>
                        <tr>
                            <th>Is completed</th>
                            <td>{checkboxInputTag(game.isCompleted)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <nav className="rw-button-group">
                <Link
                    to={routes.editGame({ id: game.id })}
                    className="rw-button rw-button-blue"
                >
                    Edit
                </Link>
                <button
                    type="button"
                    className="rw-button rw-button-red"
                    onClick={() => onDeleteClick(game.id)}
                >
                    Delete
                </button>
            </nav>
        </>
    );
};

export default Game;
