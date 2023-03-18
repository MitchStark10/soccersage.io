import { useRef, useState } from 'react';

import { useAuth } from '@redwoodjs/auth';
import { routes } from '@redwoodjs/router';

import { Person } from 'src/components/Icons/Person';
import { useBodyScrollLock } from 'src/hooks/use-body-scroll-lock';
import { ClickOutsideRef, useClickOutside } from 'src/hooks/use-click-outside';

import { HeaderLink } from './Header/HeaderLink';
import { NavLinks } from './Header/NavLinks';

interface MobileSidebarProps {
    hamburgerRef: ClickOutsideRef;
    closeSidebar: () => void;
}

export const MobileSideBar: React.VFC<MobileSidebarProps> = ({
    closeSidebar,
    hamburgerRef,
}) => {
    useBodyScrollLock();
    const sidebarRef = useRef<HTMLDivElement>(null);
    const { currentUser, isAuthenticated, logOut } = useAuth();
    const [showLogout, setShowLogout] = useState(false);
    useClickOutside([sidebarRef, hamburgerRef], closeSidebar);

    return (
        <div
            className="bg-white fixed w-5/6 left-0 bottom-0 fit-under-nav border-t-white px-2 py-2 z-50 overflow-y-auto"
            ref={sidebarRef}
        >
            {isAuthenticated ? (
                <div>
                    <button
                        className="flex flex-row justify-start items-center py-4 cursor-pointer"
                        onClick={() =>
                            setShowLogout((currentState) => !currentState)
                        }
                    >
                        <Person className="mx-2" />
                        <p>{currentUser.username}</p>
                    </button>
                    {showLogout && (
                        <HeaderLink
                            variant="mobile"
                            to="#"
                            onClick={() => logOut()}
                        >
                            Logout
                        </HeaderLink>
                    )}
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
                onNavLinkClick={closeSidebar}
                includeLogoLink={false}
            />
        </div>
    );
};
