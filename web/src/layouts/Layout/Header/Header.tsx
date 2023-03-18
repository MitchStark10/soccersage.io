import { useRef, useState } from 'react';

import classNames from 'classnames';

import { useAuth } from '@redwoodjs/auth';
import { routes } from '@redwoodjs/router';

import { Button } from 'src/components/Core/Form/Button';
import { Hamburger } from 'src/components/Icons/Hamburger';

import { MobileSideBar } from '../MobileSidebar';

import { HeaderLink } from './HeaderLink';
import { LogoLink } from './LogoLink';
import { NavLinks } from './NavLinks';

const DesktopHeader = () => {
    const { isAuthenticated, logOut } = useAuth();
    return (
        <>
            <NavLinks variant="desktop" />
            {isAuthenticated ? (
                <div className="flex justify-between items-center">
                    {/* TODO: Replace this with a user dropdown */}
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
                className="betterhover:hover:bg-secondary p-2 rounded betterhover:hover:cursor-pointer"
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

const BASE_CLASSES = 'gap-2 px-5';

export const Header = () => {
    return (
        <header className="sticky top-0 border-b border-b-background-gray shadow bg-white z-10">
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
