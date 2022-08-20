import { Link, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import { QUERY } from 'src/components/Season/SeasonsCell';

const DELETE_SEASON_MUTATION = gql`
    mutation DeleteSeasonMutation($id: Int!) {
        deleteSeason(id: $id) {
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

const timeTag = (datetime) => {
    return (
        datetime && (
            <time dateTime={datetime} title={datetime}>
                {new Date(datetime).toUTCString()}
            </time>
        )
    );
};

const SeasonsList = ({ seasons }) => {
    const [deleteSeason] = useMutation(DELETE_SEASON_MUTATION, {
        onCompleted: () => {
            toast.success('Season deleted');
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
        if (confirm('Are you sure you want to delete season ' + id + '?')) {
            deleteSeason({ variables: { id } });
        }
    };

    return (
        <>
            <div className="rw-segment rw-table-wrapper-responsive">
                <table className="rw-table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Start date</th>
                            <th>End date</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {seasons.map((season) => (
                            <tr key={season.id}>
                                <td>{truncate(season.id)}</td>
                                <td>{truncate(season.name)}</td>
                                <td>{timeTag(season.startDate)}</td>
                                <td>{timeTag(season.endDate)}</td>
                                <td>
                                    <nav className="rw-table-actions">
                                        <Link
                                            to={routes.adminSeason({
                                                id: season.id,
                                            })}
                                            title={
                                                'Show season ' +
                                                season.id +
                                                ' detail'
                                            }
                                            className="rw-button rw-button-small"
                                        >
                                            Show
                                        </Link>
                                        <Link
                                            to={routes.adminEditSeason({
                                                id: season.id,
                                            })}
                                            title={'Edit season ' + season.id}
                                            className="rw-button rw-button-small rw-button-blue"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            type="button"
                                            title={'Delete season ' + season.id}
                                            className="rw-button rw-button-small rw-button-red"
                                            onClick={() =>
                                                onDeleteClick(season.id)
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

            <Link to={routes.adminNewSeason()} className="rw-button  mt-2">
                <div className="rw-button-icon">+</div> New Season
            </Link>
        </>
    );
};

export default SeasonsList;
