import React from 'react';

// Apollo
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloProvider } from '@apollo/react-hooks';

// Setting the connection to the GraphQL server
const httpLink = createHttpLink({
    uri: 'http://localhost:5000'
});

// Creating an a authorization header for each request that is sent through ApolloClient
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('jwt');

    return {
        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : ''
        }
    };
});

// Setting up the ApolloClient with configuration of the link to the server and cache
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

export default ({ children }) => <ApolloProvider client={client}>{children}</ApolloProvider>;
