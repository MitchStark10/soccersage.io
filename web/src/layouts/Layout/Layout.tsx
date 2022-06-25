import { Footer } from './Footer';
import { Header } from './Header/Header';

type LayoutProps = {
    children?: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="h-screen relative overflow-y-scroll">
            <Header />
            <main className="px-5">{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
