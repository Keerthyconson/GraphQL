import { gql } from "@apollo/client";
// import {} from "@apollo/client";

const GETAUTHORS = gql`
  query {
    authors {
      name
      id
      name
      age
    }
  }
`;

const GETBOOKS = gql`
  query {
    books {
      name
      genre
      id
    }
  }
`;
// addBook($name: String!, $genre: String!, $authorId: String!)
// Creating mutation
const ADDBOOKMUTATION = gql`
  mutation ($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;

// get the bookDetails
const BOOKDETAIL = gql`
  query Book($id: ID!) {
    book(id: $id) {
      name
      genre
      author {
        name
        books {
          name
          id
        }
      }
      id
    }
  }
`;

export { GETAUTHORS, GETBOOKS, ADDBOOKMUTATION, BOOKDETAIL };
