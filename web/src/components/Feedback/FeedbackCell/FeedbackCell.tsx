import type { FindFeedbackById } from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import Feedback from 'src/components/Feedback/Feedback';

export const QUERY = gql`
    query FindFeedbackById($id: Int!) {
        feedback: feedback(id: $id) {
            id
            feedback
        }
    }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Feedback not found</div>;

export const Failure = ({ error }: CellFailureProps) => (
    <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({ feedback }: CellSuccessProps<FindFeedbackById>) => {
    return <Feedback feedback={feedback} />;
};
