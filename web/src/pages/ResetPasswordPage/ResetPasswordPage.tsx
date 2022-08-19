import { GenerateResetPasswordEmailForm } from './GenerateResetPasswordEmailForm';

const ResetPasswordPage = () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams);

    const token = params['token'];

    if (token) {
        return <p>TBD</p>;
    } else {
        return <GenerateResetPasswordEmailForm />;
    }
};

export default ResetPasswordPage;
