import { MetaTags } from '@redwoodjs/web';
import { H1 } from 'src/components/Core/Text/H1';
import { LoginForm } from 'src/components/Forms/LoginForm';

const LoginPage = () => {
    return (
        <>
            <MetaTags title="Login" description="Login page" />
            <H1>Login</H1>
            <LoginForm />
        </>
    );
};

export default LoginPage;
