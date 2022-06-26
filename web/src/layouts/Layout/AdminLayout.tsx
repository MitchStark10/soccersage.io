import { useAuth } from '@redwoodjs/auth';
import Layout from './Layout';
import NotFoundPage from 'src/pages/NotFoundPage/NotFoundPage';

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
