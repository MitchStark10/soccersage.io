import { Link } from '@redwoodjs/router';

export const HeaderLink: React.FC<React.ComponentProps<typeof Link>> = ({
    to,
    children,
}) => {
    return (
        <Link
            to={to}
            className="hover:bg-secondary flex justify-center items-center rounded p-5"
        >
            {children}
        </Link>
    );
};
