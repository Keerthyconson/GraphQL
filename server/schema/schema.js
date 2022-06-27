const graphql = require("graphql");
const _ = require("lodash");

// In our applications we have 2 object types - book & author
// We define the relationship between them
// We also query those data

// Dummy data

let books = [
  { name: "Book1", genre: "Fantasy", id: "1", authorId: "2" },
  { name: "Book2", genre: "Comedy", id: "2", authorId: "1" },
  { name: "Book3", genre: "Thriller", id: "3", authorId: "2" },
  { name: "Book4", genre: "Fiction", id: "4", authorId: "4" },
];

let authors = [
  { name: "James Patterson", age: 50, id: "1" },
  { name: "Agatha Christie", age: 45, id: "2" },
  { name: "George Orwell", age: 60, id: "3" },
  { name: "Nora Roberts", age: 25, id: "4" },
  { name: "Christopher", age: 35, id: "5" },
];

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
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
        return _.find(authors, { id: parent.authorId });
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
    age: { type: graphql.GraphQLInt },
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
        return _.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
