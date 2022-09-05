import { AuthProvider } from '@redwoodjs/auth';

import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web';
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo';
import { useEffect } from 'react';
import FatalErrorPage from 'src/pages/FatalErrorPage';
import Routes from 'src/Routes';
import './index.css';
import './scaffold.css';

const setDocHeight = () => {
    console.log('setting doc height', window.innerHeight);
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
            console.log('unmounting app, undoing event listeners');
            window.removeEventListener('resize', setDocHeight);
            window.removeEventListener('orientationchange', setDocHeight);
        };
    }, []);

    console.log('in app rendeirng');

    return (
        <FatalErrorBoundary page={FatalErrorPage}>
            <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
                <AuthProvider type="dbAuth">
                    <RedwoodApolloProvider>
                        <Routes />
                    </RedwoodApolloProvider>
                </AuthProvider>
            </RedwoodProvider>
        </FatalErrorBoundary>
    );
};

export default App;
