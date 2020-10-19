import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

// Apollo
import ApolloProvider from './ApolloProvider';

// Context
import { AuthProvider } from './context/auth.context';

// Styles
import 'semantic-ui-css/semantic.min.css';
import './index.css';

// Components
import App from './App';

ReactDOM.render(
    <ApolloProvider>
        <Router>
            <AuthProvider>
                <App />
            </AuthProvider>
        </Router>
    </ApolloProvider>,
    document.getElementById('root')
);
