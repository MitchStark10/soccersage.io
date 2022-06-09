import { Link, routes } from '@redwoodjs/router';
import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web';
import Predictions from 'src/components/Prediction/Predictions';
import type { FindPredictions } from 'types/graphql';



export const FIND_PREDICTIONS_QUERY = gql`
    query FindPredictions {
        predictions {
            id
            userId
            teamId
            prediction
        }
    }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => {
    return (
        <div className="rw-text-center">
            {'No predictions yet. '}
            <Link to={routes.newPrediction()} className="rw-link">
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
