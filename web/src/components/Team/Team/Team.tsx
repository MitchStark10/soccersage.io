import { Link, navigate, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

const DELETE_TEAM_MUTATION = gql`
    mutation DeleteTeamMutation($id: Int!) {
        deleteTeam(id: $id) {
            id
        }
    }
`;

const Team = ({ team }) => {
    const [deleteTeam] = useMutation(DELETE_TEAM_MUTATION, {
        onCompleted: () => {
            toast.success('Team deleted');
            navigate(routes.adminTeams());
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const onDeleteClick = (id) => {
        if (confirm('Are you sure you want to delete team ' + id + '?')) {
            deleteTeam({ variables: { id } });
        }
    };

    return (
        <>
            <div className="rw-segment">
                <header className="rw-segment-header">
                    <h2 className="rw-heading rw-heading-secondary">
                        Team {team.id} Detail
                    </h2>
                </header>
                <table className="rw-table">
                    <tbody>
                        <tr>
                            <th>Id</th>
                            <td>{team.id}</td>
                        </tr>
                        <tr>
                            <th>Name</th>
                            <td>{team.name}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <nav className="rw-button-group">
                <Link
                    to={routes.adminEditTeam({ id: team.id })}
                    className="rw-button rw-button-blue"
                >
                    Edit
                </Link>
                <button
                    type="button"
                    className="rw-button rw-button-red"
                    onClick={() => onDeleteClick(team.id)}
                >
                    Delete
                </button>
            </nav>
        </>
    );
};

export default Team;
