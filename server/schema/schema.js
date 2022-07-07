const graphql = require("graphql");
const _ = require("lodash");
const Book = require("../models/book");
const Author = require("../models/author");

// In our applications we have 2 object types - book & author
// We define the relationship between them
// We also query those data

// Dummy data

// let books = [
//   { name: "Book1", genre: "Fantasy", id: "1", authorId: "2" },
//   { name: "Book2", genre: "Comedy", id: "2", authorId: "1" },
//   { name: "Book3", genre: "Thriller", id: "3", authorId: "2" },
//   { name: "Book4", genre: "Fiction", id: "4", authorId: "4" },
//   { name: "Book5", genre: "Thriller", id: "5", authorId: "5" },
//   { name: "Book6", genre: "Fiction", id: "6", authorId: "3" },
//   { name: "Book7", genre: "Thriller", id: "7", authorId: "2" },
//   { name: "Book8", genre: "Fiction", id: "8", authorId: "1" },
// ];

// let authors = [
//   { name: "James Patterson", age: 50, id: "1" },
//   { name: "Agatha Christie", age: 45, id: "2" },
//   { name: "George Orwell", age: 60, id: "3" },
//   { name: "Nora Roberts", age: 25, id: "4" },
//   { name: "Christopher", age: 35, id: "5" },
// ];

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

// define a new type - book
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // return _.find(authors, { id: parent.authorId });
        return Author.findById(parent.authorId);
      },
    },
  }),
});

// define an author type
const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return _.filter(books, { authorId: parent.id });
        return Book.find({ authorId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
        // Code to get data from db / other sources
        // return _.find(books, { id: args.id });
        return Book.findById(args.id);
      },
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        // return _.find(authors, { id: args.id });
        return Author.findById(args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return books;
        return Book.find({});
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        // return authors;
        return Author.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age,
        });

        return author.save();
      },
    },

    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLID },
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        });

        return book.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
