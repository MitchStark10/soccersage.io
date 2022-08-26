import { useAuth } from '@redwoodjs/auth';
import { routes } from '@redwoodjs/router';
import classNames from 'classnames';
import { Button } from 'src/components/Core/Form/Button';
import { Text } from 'src/components/Core/Text/Text';
import { Hamburger } from 'src/components/Icons/Hamburger';
import { useToggle } from 'src/hooks/use-toggle';
import { HeaderLink } from './HeaderLink';
import { LogoLink } from './LogoLink';
import { NavLinks } from './NavLinks';

const DesktopHeader = () => {
    const { isAuthenticated, currentUser, logOut } = useAuth();
    return (
        <>
            <NavLinks />
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
        </>
    );
};

const MobileHeader = () => {
    const [isSidebarOpen, toggleIsSidebarOpen] = useToggle(false);

    return (
        <div className="flex flex-row items-center justify-start gap-2">
            <Hamburger
                width="40px"
                height="40px"
                className="hover:bg-secondary p-2 rounded"
                onClick={toggleIsSidebarOpen}
            />
            <LogoLink />
            {isSidebarOpen ? <MobileSideBar /> : null}
        </div>
    );
};

const MobileSideBar = () => {
    return <div>Hello</div>;
};

const BASE_CLASSES = 'gap-2 px-5 z-50 ';

export const Header = () => {
    return (
        <header className="w-full fixed bg-primary text-white">
            <div
                className={classNames(
                    BASE_CLASSES,
                    'h-20 hidden sm:flex justify-between items-center'
                )}
            >
                <DesktopHeader />
            </div>
            <div className={classNames(BASE_CLASSES, 'block sm:hidden')}>
                <MobileHeader />
            </div>
        </header>
    );
};
