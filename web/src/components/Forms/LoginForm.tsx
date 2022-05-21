import { Button } from '../Core/Form/Button';
import { Input } from '../Core/Form/Input';
import { Form } from './Form';

export const LoginForm: React.VFC = () => {
    return (
        <Form>
            <Input id="email" label="Email" />
            <Input id="password" label="Password" />
            <Button variant="primary">Login</Button>
            <p className="w-fit justify-self-center"> - Or - </p>
            <Button variant="secondary">Sign-Up</Button>
        </Form>
    );
};
