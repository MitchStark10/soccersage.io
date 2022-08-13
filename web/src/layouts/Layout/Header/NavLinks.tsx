import { useAuth } from '@redwoodjs/auth';
import { routes } from '@redwoodjs/router';
import { DropDownHeaderLinks, HeaderLink } from './HeaderLink';

export const NavLinks: React.VFC = () => {
    const { isAuthenticated, hasRole } = useAuth();

    return (
        <div className="h-full sticky flex justify-start items-center gap-2">
            <HeaderLink to={routes.home()}>TODO: Add Logo</HeaderLink>
            <HeaderLink to={routes.games()}>Games</HeaderLink>
            <HeaderLink to={routes.predictions()}>Predictions</HeaderLink>
            <HeaderLink to={routes.standings()}>Standings</HeaderLink>
            {isAuthenticated && hasRole('admin') ? (
                <DropDownHeaderLinks label="Admin">
                    <HeaderLink to={routes.adminSeasons()}>Seasons</HeaderLink>
                    <HeaderLink to={routes.adminTeams()}>Teams</HeaderLink>
                    <HeaderLink to={routes.adminGames()}>Games</HeaderLink>
                    <HeaderLink to={routes.adminPredictions()}>
                        Predictions
                    </HeaderLink>
                </DropDownHeaderLinks>
            ) : null}
        </div>
    );
};
