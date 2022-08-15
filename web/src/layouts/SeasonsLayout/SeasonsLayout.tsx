import { Link, routes } from '@redwoodjs/router';
import { Toaster } from '@redwoodjs/web/toast';

type SeasonLayoutProps = {
    children: React.ReactNode;
};

const SeasonsLayout = ({ children }: SeasonLayoutProps) => {
    return (
        <div className="rw-scaffold">
            <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
            <header className="rw-header">
                <h1 className="rw-heading rw-heading-primary">
                    <Link to={routes.adminSeasons()} className="rw-link">
                        Seasons
                    </Link>
                </h1>
                <Link
                    to={routes.adminNewSeason()}
                    className="rw-button rw-button-green"
                >
                    <div className="rw-button-icon">+</div> New Season
                </Link>
            </header>
            <main className="rw-main">{children}</main>
        </div>
    );
};

export default SeasonsLayout;
