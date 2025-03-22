import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "", // ✅ Your Nhost GraphQLapi
  cache: new InMemoryCache(),
});

export default client;
