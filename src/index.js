import React from 'react';
import { createRoot } from "react-dom/client";
import App from './App';
import { HashRouter } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://ecommerce-fazm01-scandiweb.000webhostapp.com/',
    cache: new InMemoryCache(),
})

const root = createRoot(document.querySelector('#root'));
root.render(
<ApolloProvider client={client}>
<HashRouter>
<App />
</HashRouter>    
</ApolloProvider>

);

