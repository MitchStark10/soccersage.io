import { Button } from '../Core/Form/Button';
import { Input } from '../Core/Form/Input';

export const LoginForm: React.VFC = () => {
    return (
        <form className="border-gray-300 rounded-lg w-1/2 m-auto grid gap-y-4 items-center max-w-lg">
            <Input id="email" label="Email" />
            <Input id="password" label="Password" />
            <Button variant="primary">Login</Button>
            <p className="w-fit justify-self-center"> - Or - </p>
            <Button variant="secondary">Sign-Up</Button>
        </form>
    );
};
