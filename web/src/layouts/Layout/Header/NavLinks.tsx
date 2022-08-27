import { useAuth } from '@redwoodjs/auth';
import { routes } from '@redwoodjs/router';
import classNames from 'classnames';
import { DropDownHeaderLinks, HeaderLink } from './HeaderLink';
import { LogoLink } from './LogoLink';

interface Props {
    variant: 'desktop' | 'mobile';
    includeLogoLink?: boolean;
}

export const NavLinks: React.VFC<Props> = ({
    variant,
    includeLogoLink = true,
}) => {
    const { isAuthenticated, hasRole } = useAuth();

    return (
        <div
            className={classNames(
                'h-full sticky flex justify-start items-center gap-2',
                { 'flex-col': variant === 'mobile' }
            )}
        >
            {includeLogoLink ? <LogoLink /> : null}
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
