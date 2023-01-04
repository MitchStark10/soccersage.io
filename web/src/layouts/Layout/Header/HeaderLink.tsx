import classNames from 'classnames';

import { Link, useMatch } from '@redwoodjs/router';

const HEADER_LINK_STYLES =
    'hover:bg-primary-dark hover:text-white flex justify-start items-center rounded p-5 w-full lg:w-auto gap-4 md:my-2';

interface BaseHeaderLinkProps {
    icon?: React.ReactNode;
    variant: 'desktop' | 'mobile';
}

type HeaderLinkProps = React.ComponentProps<typeof Link> & BaseHeaderLinkProps;

export const HeaderLink: React.FC<HeaderLinkProps> = ({
    to,
    icon,
    variant,
    children,
    className,
    ...rest
}) => {
    const { match: isActivePath } = useMatch(to);
    return (
        <Link
            to={to}
            className={classNames(HEADER_LINK_STYLES, className, {
                'font-bold': isActivePath,
            })}
            {...rest}
        >
            {variant === 'mobile' ? icon : null}
            {children}
        </Link>
    );
};
interface DropDownHeaderLinksProps extends BaseHeaderLinkProps {
    label: string;
    toggleIsAdminDropdownHidden: () => void;
    isAdminDropdownHidden: boolean;
}

export const DropDownHeaderLinks: React.FC<DropDownHeaderLinksProps> = ({
    label,
    variant,
    icon,
    children,
    toggleIsAdminDropdownHidden,
    isAdminDropdownHidden,
}) => {
    return (
        <span className="relative rounded w-full">
            <button
                className={HEADER_LINK_STYLES}
                onClick={toggleIsAdminDropdownHidden}
                onKeyDown={toggleIsAdminDropdownHidden}
            >
                {variant === 'mobile' ? icon : null}
                {label}
            </button>
            <div
                className={classNames('absolute bg-primary rounded', {
                    hidden: isAdminDropdownHidden,
                })}
            >
                {children}
            </div>
        </span>
    );
};
