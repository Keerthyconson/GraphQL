import { useQuery } from "@apollo/client";
import { useContext, useState } from "react";
import { BookIDProvider } from "../App";
import { BOOKDETAIL } from "../queries/queries";
import "./bookDetails.css";
// import BookDetailsTemplate from "./BookDetailsTemplate";

const BookDetails = () => {
  const book_id = useContext(BookIDProvider);
  console.log("bookId", book_id);

  const [bookData, setBookData] = useState({
    id: "id",
    name: "name",
    genre: "genre",
    author: "author",
  });

  const { loading, error, data } = useQuery(BOOKDETAIL, {
    variables: { id: book_id },
    notifyOnNetworkStatusChange: true,
  });

  if (error) console.error("Error : ", error.message);

  if (!loading) {
    console.log("Data from query :  ", data);
    if (bookData.id !== data.book.id) {
      setBookData({
        id: data.book.id,
        name: data.book.name,
        genre: data.book.genre,
        author: data.book.author,
      });
    }
    console.log("author details : ", bookData.author);
  }

  return (
    <div id="book-details">
      <h3>Book Details</h3>
      <div className="book-details">
        <p>
          Book Name : <span>{bookData.name}</span>
        </p>
        <p>
          ID : <span>{bookData.id}</span>
        </p>
        <p>
          Genre: <span>{bookData.genre}</span>
        </p>
        <p>
          Author : <span>{bookData.author.name}</span>
        </p>
      </div>
      <div>
        <h3>Other Books From the author : </h3>
        <ul>
          {bookData.author.books.map((book) => (
            <li>{book.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BookDetails;
