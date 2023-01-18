import classNames from 'classnames';
import { Provider, useSelector } from 'react-redux';

import { RootState, store } from 'src/store';

import { Footer } from './Footer';
import { Header } from './Header/Header';

type LayoutProps = {
    children?: React.ReactNode;
};

const Content = ({ children }: LayoutProps) => {
    const isUsingOverlay = useSelector(
        (state: RootState) => state.isUsingOverlay
    );

    console.log('isUsingOverlay', isUsingOverlay);

    return (
        <div
            className={classNames('px-5 bg-background-gray', {
                'opacity-40': isUsingOverlay,
            })}
            style={{
                minHeight: 'calc(100vh - 165px)',
            }}
        >
            {children}
        </div>
    );
};

const Layout = ({ children }: LayoutProps) => {
    return (
        <main>
            <Provider store={store}>
                <Header />
                <Content>{children}</Content>
                <Footer />
            </Provider>
        </main>
    );
};

export default Layout;
