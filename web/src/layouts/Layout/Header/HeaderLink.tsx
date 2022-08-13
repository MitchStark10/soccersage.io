import { Link } from '@redwoodjs/router';
import classNames from 'classnames';
import { useState } from 'react';

const Header_LINK_STYLES =
    'hover:bg-secondary flex justify-center items-center rounded p-5';

export const HeaderLink: React.FC<React.ComponentProps<typeof Link>> = ({
    to,
    children,
}) => {
    return (
        <Link to={to} className={Header_LINK_STYLES}>
            {children}
        </Link>
    );
};
interface DropDownHeaderLinksProps {
    label: string;
}

export const DropDownHeaderLinks: React.FC<DropDownHeaderLinksProps> = ({
    label,
    children,
}) => {
    const [isHidden, setIsHidden] = useState(true);

    const showLinks = () => setIsHidden(true);
    const hideLinks = () => setIsHidden(false);

    return (
        <span
            className="relative"
            onMouseEnter={showLinks}
            onMouseLeave={hideLinks}
        >
            <p className={Header_LINK_STYLES}>{label}</p>
            <div
                className={classNames('absolute mt-5 bg-blue', {
                    hidden: isHidden,
                })}
            >
                {children}
            </div>
        </span>
    );
};
