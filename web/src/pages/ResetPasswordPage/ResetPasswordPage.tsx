import { Form } from '@redwoodjs/forms';
import { MetaTags } from '@redwoodjs/web';
import { useState } from 'react';
import { Button } from 'src/components/Core/Form/Button';
import { Input } from 'src/components/Core/Form/Input';
import { ErrorText } from 'src/components/Core/Text/ErrorText';
import { H1 } from 'src/components/Core/Text/H1';
import { useInputText } from 'src/hooks/use-input-text';

const ResetPasswordPage = () => {
    const [email, onEmailChange] = useInputText('');
    const [error] = useState('');

    const onSubmit = () => {
        alert('Unimplemented :(');
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
