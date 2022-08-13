import { Link, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import { QUERY } from 'src/components/Game/GamesCell';

const DELETE_GAME_MUTATION = gql`
    mutation DeleteGameMutation($id: Int!) {
        deleteGame(id: $id) {
            id
        }
    }
`;

const MAX_STRING_LENGTH = 150;

const truncate = (text) => {
    let output = text;
    if (text && text.length > MAX_STRING_LENGTH) {
        output = output.substring(0, MAX_STRING_LENGTH) + '...';
    }
    return output;
};

const checkboxInputTag = (checked) => {
    return <input type="checkbox" checked={checked} disabled />;
};

const GamesList = ({ games }) => {
    const [deleteGame] = useMutation(DELETE_GAME_MUTATION, {
        onCompleted: () => {
            toast.success('Game deleted');
        },
        onError: (error) => {
            toast.error(error.message);
        },
        // This refetches the query on the list page. Read more about other ways to
        // update the cache over here:
        // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
        refetchQueries: [{ query: QUERY }],
        awaitRefetchQueries: true,
    });

    const onDeleteClick = (id) => {
        if (confirm('Are you sure you want to delete game ' + id + '?')) {
            deleteGame({ variables: { id } });
        }
    };

    return (
        <>
            <div className="rw-segment rw-table-wrapper-responsive">
                <table className="rw-table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Home team id</th>
                            <th>Away team id</th>
                            <th>Home team score</th>
                            <th>Away team score</th>
                            <th>Is completed</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {games.map((game) => (
                            <tr key={game.id}>
                                <td>{truncate(game.id)}</td>
                                <td>{truncate(game.homeTeamId)}</td>
                                <td>{truncate(game.awayTeamId)}</td>
                                <td>{truncate(game.homeTeamScore)}</td>
                                <td>{truncate(game.awayTeamScore)}</td>
                                <td>{checkboxInputTag(game.isCompleted)}</td>
                                <td>
                                    <nav className="rw-table-actions">
                                        <Link
                                            to={routes.adminGame({
                                                id: game.id,
                                            })}
                                            title={
                                                'Show game ' +
                                                game.id +
                                                ' detail'
                                            }
                                            className="rw-button rw-button-small"
                                        >
                                            Show
                                        </Link>
                                        <Link
                                            to={routes.adminEditGame({
                                                id: game.id,
                                            })}
                                            title={'Edit game ' + game.id}
                                            className="rw-button rw-button-small rw-button-blue"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            type="button"
                                            title={'Delete game ' + game.id}
                                            className="rw-button rw-button-small rw-button-red"
                                            onClick={() =>
                                                onDeleteClick(game.id)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </nav>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Link to={routes.adminNewTeam()} className="rw-button  mt-2">
                <div className="rw-button-icon">+</div> New Team
            </Link>
        </>
    );
};

export default GamesList;
