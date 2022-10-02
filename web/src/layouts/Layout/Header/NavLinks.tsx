import { useAuth } from '@redwoodjs/auth';
import { routes } from '@redwoodjs/router';
import { useToggle } from 'src/hooks/use-toggle';
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
    const [isAdminDropdownHidden, toggleIsAdminDropDownHidden] =
        useToggle(true);

    const onAdminNavLinkClick = () => {
        toggleIsAdminDropDownHidden();
        onNavLinkClick?.();
    };

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
                    <DropDownHeaderLinks
                        label="Admin"
                        isAdminDropdownHidden={isAdminDropdownHidden}
                        toggleIsAdminDropdownHidden={
                            toggleIsAdminDropDownHidden
                        }
                    >
                        <HeaderLink
                            to={routes.adminSeasons()}
                            onClick={onAdminNavLinkClick}
                        >
                            Seasons
                        </HeaderLink>
                        <HeaderLink
                            to={routes.adminTeams()}
                            onClick={onAdminNavLinkClick}
                        >
                            Teams
                        </HeaderLink>
                        <HeaderLink
                            to={routes.adminGames()}
                            onClick={onAdminNavLinkClick}
                        >
                            Games
                        </HeaderLink>
                        <HeaderLink
                            to={routes.adminPredictions()}
                            onClick={onAdminNavLinkClick}
                        >
                            Predictions
                        </HeaderLink>
                    </DropDownHeaderLinks>
                ) : null}
            </div>
        </div>
    );
};
