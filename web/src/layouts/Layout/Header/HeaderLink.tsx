import { Link } from '@redwoodjs/router';
import classNames from 'classnames';
import { useToggle } from 'src/hooks/use-toggle';

const HEADER_LINK_STYLES =
    'hover:bg-secondary flex justify-center items-center rounded p-5 w-full lg:w-auto';

export const HeaderLink: React.FC<React.ComponentProps<typeof Link>> = ({
    to,
    children,
    className,
    ...rest
}) => {
    return (
        <Link
            to={to}
            className={classNames(HEADER_LINK_STYLES, className)}
            {...rest}
        >
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
    const [isHidden, toggleIsHidden] = useToggle(true);

    return (
        <span className="relative bg-primary rounded w-full">
            <button
                className={HEADER_LINK_STYLES}
                onClick={toggleIsHidden}
                onKeyDown={toggleIsHidden}
            >
                {label}
            </button>
            <div
                className={classNames('absolute bg-primary rounded', {
                    hidden: isHidden,
                })}
            >
                {children}
            </div>
        </span>
    );
};
