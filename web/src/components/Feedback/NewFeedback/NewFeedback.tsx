import type { CreateFeedbackInput } from 'types/graphql';

import { navigate, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import { Text } from 'src/components/Core/Text/Text';
import FeedbackForm from 'src/components/Feedback/FeedbackForm';

const CREATE_FEEDBACK_MUTATION = gql`
    mutation CreateFeedbackMutation($input: CreateFeedbackInput!) {
        createFeedback(input: $input) {
            id
        }
    }
`;

const NewFeedback = () => {
    const [createFeedback, { loading, error }] = useMutation(
        CREATE_FEEDBACK_MUTATION,
        {
            onCompleted: () => {
                toast.success('Feedback submitted successfully');
                navigate(routes.home());
            },
            onError: (error) => {
                toast.error(error.message);
            },
        }
    );

    const onSave = (input: CreateFeedbackInput) => {
        createFeedback({ variables: { input } });
    };

    return (
        <div>
            <Text variant="h3" As="h1" className="text-center">
                Provide Feedback
            </Text>
            <FeedbackForm onSave={onSave} loading={loading} error={error} />
        </div>
    );
};

export default NewFeedback;
