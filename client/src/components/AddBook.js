import {
  useMutation,
  //  gql,
  useQuery,
} from "@apollo/client";
import { useState } from "react";
import { GETAUTHORS, ADDBOOKMUTATION, GETBOOKS } from "../queries/queries";
import "./addBook.css";

// const GETAUTHORS = gql`
//   query {
//     authors {
//       name
//       id
//       name
//       age
//     }
//   }
// `;

const AddBook = () => {
  const { loading, error, data, refetch } = useQuery(GETAUTHORS);
  const [
    addBook,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(ADDBOOKMUTATION, {
    refetchQueries: [
      {
        query: GETBOOKS,
      },
    ],
  });
  const [newBook, setNewBook] = useState({
    name: "",
    genre: "",
    authorId: "",
  });

  if (loading) return <p>Loading Authors data.... </p>;
  if (error) return <p>Error in loading.. {error}</p>;
  if (mutationLoading) return <p>Submitting data.... </p>;
  if (mutationError) return <p>Error in submission.. {mutationError}</p>;

  const submitForm = (e) => {
    e.preventDefault();
    console.log(newBook);

    addBook({
      variables: {
        name: newBook.name,
        genre: newBook.genre,
        authorId: newBook.authorId,
      },
    });
    refetch();
    console.log(mutationData);
  };
  if (!loading) {
    const { authors } = data;
    // console.log(authors);
    return (
      <form id="addBook" onSubmit={submitForm}>
        <div className="field">
          <label>Book Name</label>
          <input
            type="text"
            onChange={(e) => setNewBook({ ...newBook, name: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Genre</label>
          <input
            type="text"
            onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Author</label>
          <select
            onChange={(e) =>
              setNewBook({ ...newBook, authorId: e.target.value })
            }
          >
            <option key="heading">Select Author</option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">+</button>
      </form>
    );
  }
};

export default AddBook;
