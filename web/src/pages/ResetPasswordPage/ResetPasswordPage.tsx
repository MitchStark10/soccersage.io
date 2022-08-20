import { GenerateResetPasswordEmailForm } from './GenerateResetPasswordEmailForm';
import { ResetPasswordForm } from './ResetPasswordForm';

const ResetPasswordPage = () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams);

    const token = params['token'];

    if (token) {
        return <ResetPasswordForm token={token} />;
    } else {
        return <GenerateResetPasswordEmailForm />;
    }
};

export default ResetPasswordPage;
