import { MetaTags } from '@redwoodjs/web';

import { Text } from 'src/components/Core/Text/Text';
import { LoginForm } from 'src/components/Forms/LoginForm';

const LoginPage = () => {
    return (
        <>
            <MetaTags title="Login" description="Login page" />
            <Text As="h1">Login</Text>
            <LoginForm />
        </>
    );
};

export default LoginPage;
