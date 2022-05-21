type LayoutProps = {
    children?: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <header> TODO: Header</header>
            <main>{children}</main>
            <footer>TODO: Footer</footer>
        </>
    );
};

export default Layout;
