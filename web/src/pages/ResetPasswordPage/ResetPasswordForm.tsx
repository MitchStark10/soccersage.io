import { navigate, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { useState } from 'react';
import { Button } from 'src/components/Core/Form/Button';
import { Input } from 'src/components/Core/Form/Input';
import { ErrorText } from 'src/components/Core/Text/ErrorText';
import { H1 } from 'src/components/Core/Text/H1';
import { Text } from 'src/components/Core/Text/Text';
import { Form } from 'src/components/Forms/Form';
import { useInputText } from 'src/hooks/use-input-text';

interface Props {
    token: string;
}

const RESET_PASSWORD_MUTATION = gql`
    mutation ResetPasswordMutation($resetToken: String!, $password: String!) {
        resetPassword(resetToken: $resetToken, password: $password) {
            id
        }
    }
`;

export const ResetPasswordForm: React.VFC<Props> = ({ token }) => {
    const [newPassword, onNewPasswordChange] = useInputText('');
    const [confirmPassword, onConfirmPasswordChange] = useInputText('');
    const [customError, setCustomError] = useState('');

    const [resetPassword, { data, error, loading }] = useMutation(
        RESET_PASSWORD_MUTATION,
        {
            variables: {
                resetToken: token,
                password: newPassword,
            },
            onCompleted: () => {
                setTimeout(() => {
                    navigate(routes.home());
                }, 1000);
            },
        }
    );

    const onSubmit = async () => {
        if (newPassword !== confirmPassword) {
            setCustomError('Passwords do not match.');
            return;
        }
        setCustomError('');
        await resetPassword();
    };

    return (
        <>
            <H1>Reset Password</H1>
            <Form onSubmit={onSubmit}>
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
                <ErrorText>{customError || error?.message}</ErrorText>
                {data?.resetPassword.id ? (
                    <Text>Success! Redirecting home...</Text>
                ) : null}
                <Button variant="primary" type="submit" disabled={loading}>
                    Reset Password
                </Button>
            </Form>
        </>
    );
};
