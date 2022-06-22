import { Footer } from './Footer';
import { Header } from './Header';

type LayoutProps = {
    children?: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <Header />
            <main className="px-5">{children}</main>
            <Footer />
        </>
    );
};

export default Layout;
