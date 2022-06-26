import { useAuth } from '@redwoodjs/auth';
import { useState } from 'react';
import { useInputText } from 'src/hooks/use-input-text';
import { Button } from '../Core/Form/Button';
import { Input } from '../Core/Form/Input';
import { ErrorText } from '../Core/Text/ErrorText';
import { Form } from './Form';

export const LoginForm: React.VFC = () => {
    const [email, onEmailChange] = useInputText('');
    const [password, onPasswordChange] = useInputText('');
    const [error, setError] = useState('');
    const { logIn, loading, isAuthenticated } = useAuth();

    const handleSubmit = async () => {
        const response = await logIn({
            username: email.toLowerCase(),
            password,
        });
        if (response.error) {
            setError(response.error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    } else if (isAuthenticated) {
        return <p>Authenticated!</p>;
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
            <p className="w-fit justify-self-center"> - Or - </p>
            <Button variant="secondary" as="a" to="/sign-up">
                Sign-Up
            </Button>
        </Form>
    );
};
