import { Button } from '../Core/Form/Button';
import { Input } from '../Core/Form/Input';
import { Form } from './Form';

export const SignUpForm: React.VFC = () => {
    return (
        <Form>
            <Input id="email" label="Email" />
            <Input id="password" label="Password" />
            <Input id="confirm-password" label="Confirm Password" />
            <Button variant="primary">Sign-Up</Button>
            <p className="w-fit justify-self-center"> - Or - </p>
            <Button variant="secondary">Login</Button>
        </Form>
    );
};
