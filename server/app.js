const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const app = express();

// Now we setup a middleware
app.use("/graphql", graphqlHTTP({}));

app.listen(4000, () => {
  console.log("Listening on port 4000");
});
