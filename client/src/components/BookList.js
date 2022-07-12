// apollo-client

import { gql, useQuery } from "@apollo/client";

const GETBOOKS = gql`
  query {
    books {
      name
      genre
      id
    }
  }
`;

const BookList = () => {
  const { loading, error, data } = useQuery(
    GETBOOKS
    //     {
    //     fetchPolicy: "no-cache",
    //   }
  );
  console.log(data);
  //   if (!loading) console.log(data);
  //   if (loading) return <p>Loading.....</p>;
  if (error) return <p>Error....{error.message}</p>;

  if (!loading)
    return (
      <div>
        <p>{data}</p>
        <ul id="book-list">
          {data.map((book) => (
            <li key={book.id}>{book.name}</li>
          ))}
        </ul>
      </div>
    );
};

export default BookList;
