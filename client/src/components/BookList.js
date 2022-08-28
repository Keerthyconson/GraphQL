// apollo-client

import {
  // gql,
  useQuery,
} from "@apollo/client";
import { GETBOOKS } from "../queries/queries";

// const GETBOOKS = gql`
//   query {
//     books {
//       name
//       genre
//       id
//     }
//   }
// `;

const BookList = (props) => {
  const { loading, error, data } = useQuery(GETBOOKS);

  if (loading) return <p>Loading.....</p>;
  if (error) return <p>Error....{error.message}</p>;

  const handleClick = (value) => {
    console.log("Clicked");
    console.log("bla", value);
    // Now we have to pass this value to BookDetails component.
    props.setIdApp(value);
  };

  if (!loading) {
    const { books } = data;
    return (
      <div>
        <p>{books.name}</p>
        <ul id="book-list">
          {books.map((book) => (
            <li key={book.id}>
              <button
                className="btn"
                onClick={() => handleClick(book.id)}
                value={book.id}
              >
                {book.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
};

export default BookList;
