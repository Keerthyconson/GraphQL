// Components
import BookList from "./components/BookList";

// Apollo client
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { gql } from "@apollo/client";

// apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

client
  .query({
    query: gql`
      query {
        books {
          name
          genre
          id
        }
      }
    `,
  })
  .then((result) => console.log(result));
function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Ninja's Reading List</h1>
        <BookList />
      </div>
    </ApolloProvider>
  );
}

export default App;
