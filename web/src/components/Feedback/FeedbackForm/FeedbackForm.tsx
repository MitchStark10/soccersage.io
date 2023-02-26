import type { EditFeedbackById, UpdateFeedbackInput } from 'types/graphql';

import type { RWGqlError } from '@redwoodjs/forms';

import { Button } from 'src/components/Core/Form/Button';
import { TextArea } from 'src/components/Core/Form/TextArea';
import { Form } from 'src/components/Forms/Form';
import { useInputText } from 'src/hooks/use-input-text';

type FormFeedback = NonNullable<EditFeedbackById['feedback']>;

interface FeedbackFormProps {
    feedback?: EditFeedbackById['feedback'];
    onSave: (data: UpdateFeedbackInput, id?: FormFeedback['id']) => void;
    error: RWGqlError;
    loading: boolean;
}

const FeedbackForm = (props: FeedbackFormProps) => {
    const [feedback, onFeedbackChange] = useInputText('');
    const onSubmit = () => {
        props.onSave({ feedback });
    };

    return (
        <div className="rw-form-wrapper">
            <Form onSubmit={onSubmit}>
                <TextArea
                    name="feedback"
                    value={feedback}
                    onChange={onFeedbackChange}
                    className="rw-input"
                />

                <Button type="submit" variant="primary">
                    Submit Feedback
                </Button>
            </Form>
        </div>
    );
};

export default FeedbackForm;
