import type { FindPredictions } from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import Predictions from 'src/components/Prediction/Predictions';

export const QUERY = gql`
    query FindPredictions {
        predictions {
            id
            userId
            gameId
            teamId
            prediction
            user {
                email
            }
            team {
                name
            }
        }
    }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => {
    return (
        <div className="rw-text-center">
            {'No predictions yet. '}
            <Link to={routes.adminNewPrediction()} className="rw-link">
                {'Create one?'}
            </Link>
        </div>
    );
};

export const Failure = ({ error }: CellFailureProps) => (
    <div className="rw-cell-error">{error.message}</div>
);

export const Success = ({ predictions }: CellSuccessProps<FindPredictions>) => {
    return <Predictions predictions={predictions} />;
};
