import { useAuth } from '@redwoodjs/auth';
import { routes } from '@redwoodjs/router';
import { DropDownHeaderLinks, HeaderLink } from './HeaderLink';
import { LogoLink } from './LogoLink';

interface Props {
    variant: 'desktop' | 'mobile';
    includeLogoLink?: boolean;
    onNavLinkClick?: () => void;
}

export const NavLinks: React.VFC<Props> = ({
    includeLogoLink = true,
    onNavLinkClick,
}) => {
    const { isAuthenticated, hasRole } = useAuth();

    return (
        <div className="flex justify-start items-center">
            {includeLogoLink ? <LogoLink /> : null}
            <div
                className={
                    'h-full sticky flex justify-start items-center gap-2 flex-col lg:flex-row w-full lg:w-auto'
                }
            >
                <HeaderLink to={routes.games()} onClick={onNavLinkClick}>
                    Games
                </HeaderLink>
                <HeaderLink to={routes.predictions()} onClick={onNavLinkClick}>
                    Predictions
                </HeaderLink>
                <HeaderLink to={routes.standings()} onClick={onNavLinkClick}>
                    Standings
                </HeaderLink>
                {isAuthenticated && hasRole('admin') ? (
                    <DropDownHeaderLinks label="Admin">
                        <HeaderLink
                            to={routes.adminSeasons()}
                            onClick={onNavLinkClick}
                        >
                            Seasons
                        </HeaderLink>
                        <HeaderLink
                            to={routes.adminTeams()}
                            onClick={onNavLinkClick}
                        >
                            Teams
                        </HeaderLink>
                        <HeaderLink
                            to={routes.adminGames()}
                            onClick={onNavLinkClick}
                        >
                            Games
                        </HeaderLink>
                        <HeaderLink
                            to={routes.adminPredictions()}
                            onClick={onNavLinkClick}
                        >
                            Predictions
                        </HeaderLink>
                    </DropDownHeaderLinks>
                ) : null}
            </div>
        </div>
    );
};
