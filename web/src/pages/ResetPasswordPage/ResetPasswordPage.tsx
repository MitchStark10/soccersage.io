import { MetaTags, useMutation } from '@redwoodjs/web';
import { useState } from 'react';
import { Button } from 'src/components/Core/Form/Button';
import { Input } from 'src/components/Core/Form/Input';
import { ErrorText } from 'src/components/Core/Text/ErrorText';
import { H1 } from 'src/components/Core/Text/H1';
import { Form } from 'src/components/Forms/Form';
import { useInputText } from 'src/hooks/use-input-text';

const RESET_PASSWORD_MUTATION = gql`
    mutation ResetPassword($email: String!) {
        sendResetPasswordEmail(email: $email) {
            success
        }
    }
`;

const ResetPasswordPage = () => {
    const [email, onEmailChange] = useInputText('');
    const [error] = useState('');

    const [sendResetPasswordEmail] = useMutation(RESET_PASSWORD_MUTATION, {
        variables: {
            email,
        },
    });

    const onSubmit = () => {
        sendResetPasswordEmail();
    };

    return (
        <>
            <MetaTags title="ResetPassword" description="ResetPassword page" />
            <H1>Reset Password</H1>
            <Form onSubmit={onSubmit}>
                <Input
                    id="email"
                    label="Email"
                    value={email}
                    onChange={onEmailChange}
                />
                <ErrorText>{error}</ErrorText>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </>
    );
};

export default ResetPasswordPage;
