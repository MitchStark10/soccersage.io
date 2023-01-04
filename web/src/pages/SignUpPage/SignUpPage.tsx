import { MetaTags } from '@redwoodjs/web';

import { Text } from 'src/components/Core/Text/Text';
import { SignUpForm } from 'src/components/Forms/SignUpForm';

const SignUpPage = () => {
    return (
        <>
            <MetaTags title="Sign Up" description="SignUp page" />
            <Text As="h1" className="text-center">
                Sign Up
            </Text>
            <SignUpForm />
        </>
    );
};

export default SignUpPage;
