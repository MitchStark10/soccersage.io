import { useAuth } from '@redwoodjs/auth';
import { navigate, routes } from '@redwoodjs/router';
import { useState } from 'react';
import { useInputText } from 'src/hooks/use-input-text';
import { Button } from '../Core/Form/Button';
import { Input } from '../Core/Form/Input';
import { ErrorText } from '../Core/Text/ErrorText';
import { Form } from './Form';

export const SignUpForm: React.VFC = () => {
    const [email, onEmailChange] = useInputText('');
    const [password, onPasswordChange] = useInputText('');
    const [confirmedPassword, onConfirmedPasswordChange] = useInputText('');
    const [customError, setCustomError] = useState('');
    const { signUp, loading } = useAuth();

    const handleSubmit = async () => {
        if (password !== confirmedPassword) {
            setCustomError('Passwords do not match.');
            return;
        }

        const signUpResponse = await signUp({ username: email, password });

        if (signUpResponse.error) {
            setCustomError(signUpResponse.error);
        } else {
            navigate(routes.home());
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Input
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={onEmailChange}
                required
            />
            <Input
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={onPasswordChange}
                required
            />
            <Input
                id="confirm-password"
                label="Confirm Password"
                type="password"
                value={confirmedPassword}
                onChange={onConfirmedPasswordChange}
                required
            />
            <ErrorText>{customError}</ErrorText>
            <Button variant="primary" type="submit" disabled={loading}>
                Sign-Up
            </Button>
            <p className="w-fit justify-self-center"> - Or - </p>
            <Button variant="secondary" as="a" to="/login">
                Login
            </Button>
        </Form>
    );
};
