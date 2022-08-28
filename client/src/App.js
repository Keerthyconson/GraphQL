// Components
import BookList from "./components/BookList";

// Apollo client
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import AddBook from "./components/AddBook";
import BookDetails from "./components/BookDetails";
import { useState } from "react";
import React from "react";
import BookDetailsTemplate from "./components/BookDetailsTemplate";

// apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

export const BookIDProvider = React.createContext();

function App() {
  const [id, setId] = useState("");
  const setIdApp = (childData) => {
    setId(childData);
    // console.log("The value is  : ", id);
  };

  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Ninja's Reading List</h1>
        <div className="tab">
          <BookList setIdApp={setIdApp} />
          <BookIDProvider.Provider value={id}>
            {id !== "" ? <BookDetails /> : <BookDetailsTemplate />}
          </BookIDProvider.Provider>
        </div>
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
