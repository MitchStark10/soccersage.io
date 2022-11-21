import { useEffect, useState } from 'react';

import { Link, navigate, routes } from '@redwoodjs/router';

import { useAuth } from 'src/hooks/use-auth';
import { useInputText } from 'src/hooks/use-input-text';

import { Button } from '../Core/Form/Button';
import { Input } from '../Core/Form/Input';
import { ErrorText } from '../Core/Text/ErrorText';

import { Form } from './Form';

export const LoginForm: React.VFC = () => {
    const [email, onEmailChange] = useInputText('');
    const [password, onPasswordChange] = useInputText('');
    const [error, setError] = useState('');
    const { logIn, loading, isInitialized, isAuthenticated } = useAuth();

    const handleSubmit = async () => {
        const response = await logIn({
            username: email.toLowerCase(),
            password,
        });
        if (response.error) {
            setError(response.error);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate(routes.games());
        }
    }, [isAuthenticated]);

    if (!isInitialized) {
        return <div>Loading...</div>;
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Input
                id="email"
                label="Email"
                value={email}
                onChange={onEmailChange}
            />
            <Input
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={onPasswordChange}
            />
            <ErrorText>{error}</ErrorText>
            <Button variant="primary" type="submit" disabled={loading}>
                Login
            </Button>
            <Link
                to={routes.resetPassword()}
                className="text-center hover:underline"
            >
                Forgot your password?
            </Link>
            <p className="w-fit justify-self-center"> - Or - </p>
            <Button variant="secondary" as="a" to="/sign-up">
                Sign Up
            </Button>
        </Form>
    );
};
