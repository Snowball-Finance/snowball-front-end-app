import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { env } from "utils/environment/variables";

export const apolloClient = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  link: new HttpLink({
    uri: env.ENVIRONMENT === 'DEV' ? env.DEVAPIADDR : env.APIADDR,
  }),
  cache: new InMemoryCache(),
})

export const query = apolloClient.query