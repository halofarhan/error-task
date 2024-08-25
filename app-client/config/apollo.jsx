import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import * as SecureStore from "expo-secure-store";

const httpLink = createHttpLink({
  uri: "https://brg41rbm-4000.asse.devtunnels.ms/",
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await SecureStore.getItemAsync("token");

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
// const client = new ApolloClient({
//   // uri: 'http://localhost:4000', // jika pakai macbook & simulator iOS
//   uri: "https://d6h8mss5-4000.asse.devtunnels.ms/",
//   cache: new InMemoryCache(),
// });

export default client;
