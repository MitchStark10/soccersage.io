import { Link } from '@redwoodjs/router';

export const HeaderLink: React.FC<React.ComponentProps<typeof Link>> = ({
    to,
    children,
}) => {
    return (
        <Link to={to} className="hover:bg-black">
            {children}
        </Link>
    );
};
