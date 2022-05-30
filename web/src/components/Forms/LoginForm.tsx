import { useAuth } from '@redwoodjs/auth';
import { Button } from '../Core/Form/Button';
import { Form } from './Form';

export const LoginForm: React.VFC = () => {
    // const [email, onEmailChange] = useInputText('');
    // const [password, onPasswordChange] = useInputText('');
    const { logIn, loading, isAuthenticated } = useAuth();

    const handleSubmit = async () => {
        await logIn({
            appState: { targetUrl: 'http://localhost:8910/login' },
        });
        console.log('processing login');
    };

    if (loading) {
        return <div>Loading...</div>;
    } else if (isAuthenticated) {
        return <p>Authenticated!</p>;
    }

    return (
        <Form onSubmit={handleSubmit}>
            {/* <Input
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
            /> */}
            {/* <ErrorText>{error?.message}</ErrorText> */}
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
