import { Footer } from './Footer';
import { Header } from './Header/Header';

type LayoutProps = {
    children?: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    return (
        <main>
            <div className="h-screen relative overflow-y-scroll">
                <Header />
                <div
                    className="px-5"
                    style={{ minHeight: 'calc(100vh - 225px)' }}
                >
                    {children}
                </div>
                <Footer />
            </div>
        </main>
    );
};

export default Layout;
