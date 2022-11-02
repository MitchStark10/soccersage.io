import { MetaTags } from '@redwoodjs/web';

import { H1 } from 'src/components/Core/Text/H1';
import { SignUpForm } from 'src/components/Forms/SignUpForm';

const SignUpPage = () => {
    return (
        <>
            <MetaTags title="Sign Up" description="SignUp page" />
            <H1 className="text-center">Sign Up</H1>
            <SignUpForm />
        </>
    );
};

export default SignUpPage;
