const graphql = require("graphql");

// In our applications we have 2 object types - book & author
// We define the relationship between them
// We also query those data

const { GraphQLObjectType, GraphQLString } = graphql;

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
