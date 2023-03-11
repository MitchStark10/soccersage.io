import type {
    DeleteFeedbackMutationVariables,
    FindFeedbackById,
} from 'types/graphql';

import { navigate, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import {} from 'src/lib/formatters';

const DELETE_FEEDBACK_MUTATION = gql`
    mutation DeleteFeedbackMutation($id: Int!) {
        deleteFeedback(id: $id) {
            id
        }
    }
`;

interface Props {
    feedback: NonNullable<FindFeedbackById['feedback']>;
}

const Feedback = ({ feedback }: Props) => {
    const [deleteFeedback] = useMutation(DELETE_FEEDBACK_MUTATION, {
        onCompleted: () => {
            toast.success('Feedback deleted');
            navigate(routes.adminFeedbackOverview());
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const onDeleteClick = (id: DeleteFeedbackMutationVariables['id']) => {
        if (confirm('Are you sure you want to delete feedback ' + id + '?')) {
            deleteFeedback({ variables: { id } });
        }
    };

    return (
        <>
            <div className="rw-segment">
                <header className="rw-segment-header">
                    <h2 className="rw-heading rw-heading-secondary">
                        Feedback {feedback.id} Detail
                    </h2>
                </header>
                <table className="rw-table">
                    <tbody>
                        <tr>
                            <th>Id</th>
                            <td>{feedback.id}</td>
                        </tr>
                        <tr>
                            <th>Feedback</th>
                            <td>{feedback.feedback}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <nav className="rw-button-group">
                <button
                    type="button"
                    className="rw-button rw-button-red"
                    onClick={() => onDeleteClick(feedback.id)}
                >
                    Delete
                </button>
            </nav>
        </>
    );
};

export default Feedback;
