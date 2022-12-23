import { routes } from '@redwoodjs/router';

import { HeaderLink } from './HeaderLink';

export const LogoLink = () => {
    return (
        <HeaderLink variant="desktop" to={routes.home()} className="w-[173px]">
            <img
                src="/logos/color_logo_no_bg.svg"
                alt="soccersage.io Logo"
                className="w-[133px] h-[26px]"
            ></img>
        </HeaderLink>
    );
};
