import type { FindSeasons } from 'types/graphql';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import { Link, routes } from '@redwoodjs/router';

import Seasons from 'src/components/Season/Seasons';

export const QUERY = gql`
    query FindSeasons {
        seasons {
            id
            name
            startDate
            endDate
        }
    }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => {
    return (
        <div className="rw-text-center">
            {'No seasons yet. '}
            <Link to={routes.adminNewSeason()} className="rw-link">
                {'Create one?'}
            </Link>
        </div>
    );
};

export const Failure = ({ error }: CellFailureProps) => (
    <div className="rw-cell-error">{error.message}</div>
);

export const Success = ({ seasons }: CellSuccessProps<FindSeasons>) => {
    return <Seasons seasons={seasons} />;
};
