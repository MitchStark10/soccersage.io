import { Footer } from './Footer';
import { Header } from './Header/Header';

type LayoutProps = {
    children?: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    return (
        <main>
            <Header />
            <div
                className="px-5"
                style={{
                    minHeight: 'calc(100vh - 165px)',
                }}
            >
                {children}
            </div>
            <Footer />
        </main>
    );
};

export default Layout;
