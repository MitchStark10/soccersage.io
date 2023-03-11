import { useAuth } from '@redwoodjs/auth';
import { routes } from '@redwoodjs/router';

import { Clipboard } from 'src/components/Icons/Clipboard';
import { Lock } from 'src/components/Icons/Lock';
import { SoccerBall } from 'src/components/Icons/SoccerBall';
import { Trophy } from 'src/components/Icons/Trophy';
import { useToggle } from 'src/hooks/use-toggle';

import { DropDownHeaderLinks, HeaderLink } from './HeaderLink';
import { LogoLink } from './LogoLink';

interface Props {
    variant: 'desktop' | 'mobile';
    includeLogoLink?: boolean;
    onNavLinkClick?: () => void;
}

export const NavLinks: React.VFC<Props> = ({
    variant,
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
                <HeaderLink
                    variant={variant}
                    to={routes.games()}
                    onClick={onNavLinkClick}
                    icon={<SoccerBall />}
                >
                    Games
                </HeaderLink>
                <HeaderLink
                    variant={variant}
                    to={routes.predictions()}
                    onClick={onNavLinkClick}
                    icon={<Clipboard />}
                >
                    Predictions
                </HeaderLink>
                <HeaderLink
                    variant={variant}
                    to={routes.standings()}
                    onClick={onNavLinkClick}
                    icon={<Trophy />}
                >
                    Standings
                </HeaderLink>
                {isAuthenticated && hasRole('admin') ? (
                    <DropDownHeaderLinks
                        variant={variant}
                        label="Admin"
                        icon={<Lock />}
                        isAdminDropdownHidden={isAdminDropdownHidden}
                        toggleIsAdminDropdownHidden={
                            toggleIsAdminDropDownHidden
                        }
                    >
                        <HeaderLink
                            variant={variant}
                            to={routes.adminSeasons()}
                            onClick={onAdminNavLinkClick}
                        >
                            Seasons
                        </HeaderLink>
                        <HeaderLink
                            variant={variant}
                            to={routes.adminTeams()}
                            onClick={onAdminNavLinkClick}
                        >
                            Teams
                        </HeaderLink>
                        <HeaderLink
                            variant={variant}
                            to={routes.adminGames()}
                            onClick={onAdminNavLinkClick}
                        >
                            Games
                        </HeaderLink>
                        <HeaderLink
                            variant={variant}
                            to={routes.adminPredictions()}
                            onClick={onAdminNavLinkClick}
                        >
                            Predictions
                        </HeaderLink>
                        <HeaderLink
                            variant={variant}
                            to={routes.adminFeedbackOverview()}
                            onClick={onAdminNavLinkClick}
                        >
                            Feedback
                        </HeaderLink>
                    </DropDownHeaderLinks>
                ) : null}
            </div>
        </div>
    );
};
