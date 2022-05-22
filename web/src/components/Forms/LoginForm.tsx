import { navigate, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { useInputText } from 'src/hooks/use-input-text';
import { Button } from '../Core/Form/Button';
import { Input } from '../Core/Form/Input';
import { ErrorText } from '../Core/Text/ErrorText';
import { Form } from './Form';

const LOGIN_MUTATION = gql`
    mutation LoginMutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            id
        }
    }
`;

export const LoginForm: React.VFC = () => {
    const [email, onEmailChange] = useInputText('');
    const [password, onPasswordChange] = useInputText('');
    const [login, { loading, error }] = useMutation(LOGIN_MUTATION, {
        onCompleted: () => {
            navigate(routes.predictions());
        },
    });

    const handleSubmit = async () => {
        await login({ variables: { email, password } });
    };

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
            <ErrorText>{error?.message}</ErrorText>
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
