export const SignUpForm: React.VFC = () => {
    // const [username, onUsernameChange] = useInputText('');
    // const [email, onEmailChange] = useInputText('');
    // const [password, onPasswordChange] = useInputText('');
    // const [confirmedPassword, onConfirmedPasswordChange] = useInputText('');
    // const [customError, setCustomError] = useState('');
    // const [createUser, { loading, error }] = useMutation(CREATE_USER_MUTATION, {
    //     onCompleted: () => {
    //         navigate(routes.predictions());
    //     },
    // });

    // const handleSubmit = async () => {
    //     if (password !== confirmedPassword) {
    //         setCustomError('Passwords do not match.');
    //         return;
    //     }
    //     console.log('sending!', { username, email, password });
    //     const input: CreateUserInput = {
    //         username,
    //         email,
    //         password,
    //     };
    //     await createUser({
    //         variables: { input },
    //     });
    // };

    // return (
    //     <Form onSubmit={handleSubmit}>
    //         <Input
    //             id="username"
    //             label="Username"
    //             value={username}
    //             onChange={onUsernameChange}
    //             required
    //         />
    //         <Input
    //             id="email"
    //             label="Email"
    //             type="email"
    //             value={email}
    //             onChange={onEmailChange}
    //             required
    //         />
    //         <Input
    //             id="password"
    //             label="Password"
    //             type="password"
    //             value={password}
    //             onChange={onPasswordChange}
    //             required
    //         />
    //         <Input
    //             id="confirm-password"
    //             label="Confirm Password"
    //             type="password"
    //             value={confirmedPassword}
    //             onChange={onConfirmedPasswordChange}
    //             required
    //         />
    //         <ErrorText>{error?.message || customError}</ErrorText>
    //         <Button variant="primary" disabled={loading}>
    //             Sign-Up
    //         </Button>
    //         <p className="w-fit justify-self-center"> - Or - </p>
    //         <Button variant="secondary" as="a" to="/login">
    //             Login
    //         </Button>
    //     </Form>
    // );

    return <p>TODO: We may not need this component at all</p>;
};
