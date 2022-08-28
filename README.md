# GraphQL
GraphQL Application with MongoDB, Node.js, Apollo & React

In this simple application we are trying to make a list of Books & their Authors by making use of GraphQL.

In the database, we have 2 collections
- Author
- Books

In the GraphQL backend, we have 2 access points to the database.
- either through Books or
- through Author

There are 2 root queries to access data
1. book 
2. author

There are 2 mutations. We can add
1. book & 
2. author

In the front end, through React we do the following functionality
* Show the list of books
* Add a book
* Display the details of the book and list of other books written by the same author when clicking the list of books.
