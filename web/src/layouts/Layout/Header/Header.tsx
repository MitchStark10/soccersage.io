import { useAuth } from '@redwoodjs/auth';
import { routes } from '@redwoodjs/router';
import { Button } from 'src/components/Core/Form/Button';
import { NavLinks } from './NavLinks';

export const Header = () => {
    const { isAuthenticated, currentUser } = useAuth();
    return (
        <header className="w-full h-20 bg-primary text-white flex justify-between items-center gap-2 px-5">
            <NavLinks />
            {isAuthenticated ? (
                <p>
                    TODO: Figure out user email{' '}
                    {JSON.stringify(currentUser.sub)}
                </p>
            ) : (
                <Button variant="primary" as="a" to={routes.login()}>
                    Login
                </Button>
            )}
        </header>
    );
};
