import { navigate, routes } from '@redwoodjs/router';
import { MetaTags, useMutation } from '@redwoodjs/web';
import { useEffect, useState } from 'react';
import { ErrorText } from 'src/components/Core/Text/ErrorText';

const SIGN_OUT_MUTATION = gql`
    mutation SignOut($email: String!) {
        signOut(email: $email) {
            id
        }
    }
`;

const SignOutPage = () => {
    const [error, setError] = useState('');
    const [signOut] = useMutation(SIGN_OUT_MUTATION, {
        onCompleted: () => {
            navigate(routes.home());
        },
        onError: (error) => {
            setError(error.message);
        },
    });

    useEffect(() => {
        // TODO: Figure out how to get the current user's email
        signOut({ variables: { email: '' } });
    });
    return (
        <>
            <MetaTags title="SignOut" description="SignOut page" />
            {error ? <ErrorText>{error}</ErrorText> : <p>Signing out...</p>}
        </>
    );
};

export default SignOutPage;
