const BookDetailsTemplate = () => {
  const bookData = {
    name: "name",
    id: "id",
    genre: "genre",
    author: "author",
  };
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
          Author : <span>{bookData.author}</span>
        </p>
      </div>
    </div>
  );
};

export default BookDetailsTemplate;
