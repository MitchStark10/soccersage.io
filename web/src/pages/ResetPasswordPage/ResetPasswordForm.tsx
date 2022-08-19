import { useMutation } from '@redwoodjs/web';
import { VFC } from 'react';
import { Button } from 'src/components/Core/Form/Button';
import { Input } from 'src/components/Core/Form/Input';
import { Form } from 'src/components/Forms/Form';
import { useInputText } from 'src/hooks/use-input-text';

interface Props {
    token: string;
}

export const ResetPasswordForm: VFC<Props> = ({ token }) => {
    const [newPassword, onNewPasswordChange] = useInputText('');
    const [confirmPassword, onConfirmPasswordChange] = useInputText('');

    const [resetPassword, { data, error, loading }] = useMutation(
        RESET_PASSWORD_MUTATION,
        {
            variables: {
                token,
                newPassword,
            },
        }
    );

    const onSubmit = () => {};

    return (
        <Form>
            <Input
                type="password"
                id="newPassword"
                label="New Password"
                value={newPassword}
                onChange={onNewPasswordChange}
            />
            <Input
                type="password"
                id="confirmPassword"
                label="Confirm Password"
                value={confirmPassword}
                onChange={onConfirmPasswordChange}
            />
            <Button variant="primary" type="submit" disabled={loading}>
                Reset Password
            </Button>
        </Form>
    );
};
