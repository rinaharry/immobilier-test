import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'

import { createApolloProvider } from '@vue/apollo-option'

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:4000/graphql'
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache
})

export const apolloProvider = createApolloProvider({
  defaultClient: apolloClient
})
