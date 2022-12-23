import { useRef, useState } from 'react';

import classNames from 'classnames';

import { useAuth } from '@redwoodjs/auth';
import { routes } from '@redwoodjs/router';

import { Button } from 'src/components/Core/Form/Button';
import { Text } from 'src/components/Core/Text/Text';
import { Hamburger } from 'src/components/Icons/Hamburger';
import { Person } from 'src/components/Icons/Person';
import { useBodyScrollLock } from 'src/hooks/use-body-scroll-lock';
import { ClickOutsideRef, useClickOutside } from 'src/hooks/use-click-outside';

import { HeaderLink } from './HeaderLink';
import { LogoLink } from './LogoLink';
import { NavLinks } from './NavLinks';

const DesktopHeader = () => {
    const { isAuthenticated, currentUser, logOut } = useAuth();
    return (
        <>
            <NavLinks variant="desktop" />
            {isAuthenticated ? (
                <div className="flex justify-between items-center">
                    <Text>{currentUser?.email}</Text>
                    <Button
                        variant="secondary"
                        onClick={() => logOut()}
                        className="ml-2"
                    >
                        Logout
                    </Button>
                </div>
            ) : (
                <HeaderLink variant="mobile" to={routes.login()}>
                    Login
                </HeaderLink>
            )}
        </>
    );
};

const MobileHeader = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const hamburgerRef = useRef<SVGSVGElement>(null);

    return (
        <div className="flex flex-row items-center justify-start gap-2">
            <Hamburger
                width="40px"
                height="40px"
                className="hover:bg-secondary p-2 rounded hover:cursor-pointer"
                onClick={() => {
                    setIsSidebarOpen(!isSidebarOpen);
                }}
                ref={hamburgerRef}
            />
            <LogoLink />
            {isSidebarOpen ? (
                <MobileSideBar
                    closeSidebar={() => setIsSidebarOpen(false)}
                    hamburgerRef={hamburgerRef}
                />
            ) : null}
        </div>
    );
};

interface MobileSidebarProps {
    hamburgerRef: ClickOutsideRef;
    closeSidebar: () => void;
}

const MobileSideBar: React.VFC<MobileSidebarProps> = ({
    closeSidebar,
    hamburgerRef,
}) => {
    useBodyScrollLock();
    const sidebarRef = useRef<HTMLDivElement>(null);

    const { currentUser, isAuthenticated } = useAuth();
    useClickOutside([sidebarRef, hamburgerRef], closeSidebar);

    return (
        <div
            className="bg-primary fixed w-5/6 left-0 bottom-0 fit-under-nav border-t-white px-2 py-2 z-50 overflow-y-scroll"
            ref={sidebarRef}
        >
            {isAuthenticated ? (
                <div className="flex flex-row justify-start items-center py-4">
                    <Person className="mx-2" />
                    <p>{currentUser.username}</p>
                </div>
            ) : (
                <HeaderLink
                    variant="mobile"
                    to={routes.login()}
                    onClick={closeSidebar}
                >
                    Login
                </HeaderLink>
            )}
            <hr className="my-2" />
            <NavLinks
                variant="mobile"
                includeLogoLink={false}
                onNavLinkClick={closeSidebar}
            />
        </div>
    );
};

const BASE_CLASSES = 'gap-2 px-5';

export const Header = () => {
    return (
        <header className="sticky top-0 bg-primary text-white">
            <div
                className={classNames(
                    BASE_CLASSES,
                    'hidden lg:flex justify-between items-center'
                )}
            >
                <DesktopHeader />
            </div>
            <div className={classNames(BASE_CLASSES, 'block lg:hidden')}>
                <MobileHeader />
            </div>
        </header>
    );
};
