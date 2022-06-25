import { routes } from '@redwoodjs/router';
import { HeaderLink } from './HeaderLink';

export const NavLinks: React.VFC = () => {
    return (
        <div className="h-full sticky flex justify-start items-center gap-2">
            <HeaderLink to={routes.home()}>TODO: Add Logo</HeaderLink>
            <HeaderLink to={routes.games()}>Games</HeaderLink>
            <HeaderLink to={routes.predictions()}>Predictions</HeaderLink>
            <HeaderLink to={routes.home()}>Standings</HeaderLink>
        </div>
    );
};
