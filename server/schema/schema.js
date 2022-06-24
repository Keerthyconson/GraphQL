const graphql = require("graphql");
const _ = require("lodash");

// In our applications we have 2 object types - book & author
// We define the relationship between them
// We also query those data

// Dummy data

let books = [
  { name: "Book1", genre: "Fantasy", id: "1" },
  { name: "Book2", genre: "Comedy", id: "2" },
  { name: "Book3", genre: "Thriller", id: "3" },
  { name: "Book4", genre: "Fiction", id: "4" },
];

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// define a new type - book
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: {
      type: GraphQLString,
    },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: {
        id: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        // Code to get data from db / other sources
        return _.find(books, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
