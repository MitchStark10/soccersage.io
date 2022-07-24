import { routes } from '@redwoodjs/router';
import { HeaderLink } from './HeaderLink';

interface Props {
    isAdmin: boolean;
}

export const NavLinks: React.VFC<Props> = ({ isAdmin }) => {
    return (
        <div className="h-full sticky flex justify-start items-center gap-2">
            <HeaderLink to={routes.home()}>TODO: Add Logo</HeaderLink>
            <HeaderLink to={routes.games()}>Games</HeaderLink>
            <HeaderLink to={routes.predictions()}>Predictions</HeaderLink>
            <HeaderLink to={routes.standings()}>Standings</HeaderLink>
            {isAdmin ? (
                <>
                    <HeaderLink to={routes['adminTeams']()}>Teams</HeaderLink>
                    <HeaderLink to={routes['adminGames']()}>Games</HeaderLink>
                    <HeaderLink to={routes['adminUsers']()}>Users</HeaderLink>
                </>
            ) : null}
        </div>
    );
};
