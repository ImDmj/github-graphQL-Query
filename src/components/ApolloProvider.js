import React from 'react';
import { ApolloProvider as Provider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const cache = new InMemoryCache();

const GITHUB_BASE_URL = 'https://api.github.com/graphql';

const httpLink = new HttpLink({
  uri: GITHUB_BASE_URL,
  headers: {
    authorization: `Bearer ${
      process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
    }`,
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache,
});

const ApolloProvider = ({ children }) => (
  <Provider client={client}>{children}</Provider>
);

export { ApolloProvider };