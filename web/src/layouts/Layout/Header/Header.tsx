import { useAuth } from '@redwoodjs/auth';
import { routes } from '@redwoodjs/router';
import { Text } from 'src/components/Core/Text/Text';
import { HeaderLink } from './HeaderLink';
import { NavLinks } from './NavLinks';

export const Header = () => {
    const { isAuthenticated, currentUser } = useAuth();
    return (
        <header className="w-full h-20 bg-primary text-white flex justify-between items-center gap-2 px-5">
            <NavLinks />
            {isAuthenticated ? (
                <Text>{currentUser.email}</Text>
            ) : (
                <HeaderLink to={routes.login()}>Login</HeaderLink>
            )}
        </header>
    );
};
