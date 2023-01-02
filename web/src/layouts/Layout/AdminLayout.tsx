import { useAuth } from '@redwoodjs/auth';

import NotFoundPage from 'src/pages/NotFoundPage/NotFoundPage';

import Layout from './Layout';

export const AdminLayout: React.FC = ({ children }) => {
    const { hasRole, loading } = useAuth();

    if (!loading && !hasRole('admin')) {
        return <NotFoundPage />;
    }

    return (
        <Layout>
            <div className="mt-10">{children}</div>
        </Layout>
    );
};
