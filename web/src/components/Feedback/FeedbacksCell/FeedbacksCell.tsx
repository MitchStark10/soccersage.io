import type { FindFeedbacks } from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import Feedbacks from 'src/components/Feedback/Feedbacks';

export const QUERY = gql`
    query FindFeedbacks {
        feedbacks {
            id
            feedback
        }
    }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => {
    return (
        <div className="rw-text-center">
            {'No feedbacks yet. '}
            <Link to={routes.provideFeedback()} className="rw-link">
                {'Create one?'}
            </Link>
        </div>
    );
};

export const Failure = ({ error }: CellFailureProps) => (
    <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({ feedbacks }: CellSuccessProps<FindFeedbacks>) => {
    return <Feedbacks feedbacks={feedbacks} />;
};
