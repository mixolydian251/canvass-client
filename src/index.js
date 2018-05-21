import './styles/style.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter'
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';

const httpLink = new HttpLink({
  uri: 'http://localhost:8081/graphql',
  credentials: 'include',
});

const middlewareLink = setContext( async (req, { headers }) => {
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");

  return {
    ...headers,
    headers: {
      "x-token": token ? token : null,
      "x-refresh-token": refreshToken ? refreshToken : null
    }
  };
});

const afterwareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    const context = operation.getContext();
    const { response: { headers } } = context;

    if (headers) {
      const token = headers.get("x-token");
      const refreshToken = headers.get("x-refresh-token");

      if (token) {
        localStorage.setItem("token", token);
      }

      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }
    }
    return response;
  });
});

const httpLinkWithMiddleware = afterwareLink.concat(middlewareLink.concat(httpLink));

const client = new ApolloClient({
  link: httpLinkWithMiddleware,
  cache: new InMemoryCache(),
});

const App = (
  <ApolloProvider client={client}>
      <AppRouter />
  </ApolloProvider>
);

ReactDOM.render(App, document.getElementById('app'));