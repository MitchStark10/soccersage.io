import { useEffect, useState } from 'react';

import { useAuth } from '@redwoodjs/auth';
import { Link, navigate, routes } from '@redwoodjs/router';

import { useInputText } from 'src/hooks/use-input-text';

import { Button } from '../Core/Form/Button';
import { Input } from '../Core/Form/Input';
import { ErrorText } from '../Core/Text/ErrorText';

import { Form } from './Form';

export const LoginForm: React.VFC = () => {
    const [email, onEmailChange] = useInputText('');
    const [password, onPasswordChange] = useInputText('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { logIn, loading, isAuthenticated } = useAuth();

    const handleSubmit = async () => {
        setIsSubmitting(true);
        const response = await logIn({
            username: email.toLowerCase(),
            password,
        });
        if (response.error) {
            setError(response.error);
        }
        setIsSubmitting(false);
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate(routes.games());
        }
    }, [isAuthenticated]);

    if (loading && !isSubmitting) {
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
