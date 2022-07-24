import { useAuth } from '@redwoodjs/auth';
import { routes } from '@redwoodjs/router';
import { Button } from 'src/components/Core/Form/Button';
import { Text } from 'src/components/Core/Text/Text';
import { HeaderLink } from './HeaderLink';
import { NavLinks } from './NavLinks';

export const Header = () => {
    const { isAuthenticated, currentUser, loading, logOut } = useAuth();
    return (
        <header className="w-full h-20 bg-primary text-white flex justify-between items-center gap-2 px-5">
            <NavLinks
                isAdmin={!loading && currentUser.roles?.includes('admin')}
            />
            {isAuthenticated ? (
                <div className="flex justify-between items-center">
                    <Text>{currentUser.email}</Text>
                    <Button
                        variant="secondary"
                        onClick={() => logOut()}
                        className="ml-2"
                    >
                        Logout
                    </Button>
                </div>
            ) : (
                <HeaderLink to={routes.login()}>Login</HeaderLink>
            )}
        </header>
    );
};
