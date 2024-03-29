import { useEffect } from 'react';

import { AuthProvider } from '@redwoodjs/auth';
import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web';
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo';
import { Toaster } from '@redwoodjs/web/dist/toast';

import FatalErrorPage from 'src/pages/FatalErrorPage';
import Routes from 'src/Routes';

import './index.css';
import './scaffold.css';

const setDocHeight = () => {
    document.documentElement.style.setProperty(
        '--vh',
        `${window.innerHeight / 100}px`
    );
};

const App = () => {
    useEffect(() => {
        setDocHeight();

        // TODO: Consider debouncing the resize handlers
        window.addEventListener('resize', setDocHeight);
        window.addEventListener('orientationchange', setDocHeight);

        return () => {
            window.removeEventListener('resize', setDocHeight);
            window.removeEventListener('orientationchange', setDocHeight);
        };
    }, []);

    return (
        <FatalErrorBoundary page={FatalErrorPage}>
            <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
                <AuthProvider type="dbAuth">
                    <RedwoodApolloProvider>
                        <Toaster
                            toastOptions={{
                                className: 'rw-toast',
                                duration: 6000,
                            }}
                        />
                        <Routes />
                    </RedwoodApolloProvider>
                </AuthProvider>
            </RedwoodProvider>
        </FatalErrorBoundary>
    );
};

export default App;
