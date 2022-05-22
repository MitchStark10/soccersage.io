import { navigate, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { useState } from 'react';
import { useInputText } from 'src/hooks/use-input-text';
import { CreateUserInput } from 'types/graphql';
import { Button } from '../Core/Form/Button';
import { Input } from '../Core/Form/Input';
import { ErrorText } from '../Core/Text/ErrorText';
import { CREATE_USER_MUTATION } from '../User/NewUser';
import { Form } from './Form';

export const SignUpForm: React.VFC = () => {
    const [username, onUsernameChange] = useInputText('');
    const [email, onEmailChange] = useInputText('');
    const [password, onPasswordChange] = useInputText('');
    const [confirmedPassword, onConfirmedPasswordChange] = useInputText('');
    const [customError, setCustomError] = useState('');
    const [createUser, { loading, error }] = useMutation(CREATE_USER_MUTATION, {
        onCompleted: () => {
            navigate(routes.predictions());
        },
    });

    const handleSubmit = async () => {
        if (password !== confirmedPassword) {
            setCustomError('Passwords do not match.');
            return;
        }
        console.log('sending!', { username, email, password });
        const input: CreateUserInput = {
            username,
            email,
            password,
        };
        await createUser({
            variables: { input },
        });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Input
                id="username"
                label="Username"
                value={username}
                onChange={onUsernameChange}
                required
            />
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
            <ErrorText>{error?.message || customError}</ErrorText>
            <Button variant="primary" disabled={loading}>
                Sign-Up
            </Button>
            <p className="w-fit justify-self-center"> - Or - </p>
            <Button variant="secondary" as="a" to="/login">
                Login
            </Button>
        </Form>
    );
};
