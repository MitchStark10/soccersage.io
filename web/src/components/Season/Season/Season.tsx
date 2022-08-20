import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';
import { Link, routes, navigate } from '@redwoodjs/router';

const DELETE_SEASON_MUTATION = gql`
    mutation DeleteSeasonMutation($id: Int!) {
        deleteSeason(id: $id) {
            id
        }
    }
`;

const timeTag = (datetime) => {
    return (
        datetime && (
            <time dateTime={datetime} title={datetime}>
                {new Date(datetime).toUTCString()}
            </time>
        )
    );
};

const Season = ({ season }) => {
    const [deleteSeason] = useMutation(DELETE_SEASON_MUTATION, {
        onCompleted: () => {
            toast.success('Season deleted');
            navigate(routes.adminSeasons());
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const onDeleteClick = (id) => {
        if (confirm('Are you sure you want to delete season ' + id + '?')) {
            deleteSeason({ variables: { id } });
        }
    };

    return (
        <>
            <div className="rw-segment">
                <header className="rw-segment-header">
                    <h2 className="rw-heading rw-heading-secondary">
                        Season {season.id} Detail
                    </h2>
                </header>
                <table className="rw-table">
                    <tbody>
                        <tr>
                            <th>Id</th>
                            <td>{season.id}</td>
                        </tr>
                        <tr>
                            <th>Name</th>
                            <td>{season.name}</td>
                        </tr>
                        <tr>
                            <th>Start date</th>
                            <td>{timeTag(season.startDate)}</td>
                        </tr>
                        <tr>
                            <th>End date</th>
                            <td>{timeTag(season.endDate)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <nav className="rw-button-group">
                <Link
                    to={routes.adminEditSeason({ id: season.id })}
                    className="rw-button rw-button-blue"
                >
                    Edit
                </Link>
                <button
                    type="button"
                    className="rw-button rw-button-red"
                    onClick={() => onDeleteClick(season.id)}
                >
                    Delete
                </button>
            </nav>
        </>
    );
};

export default Season;
