const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const schema = require("./schema/schema");
const cors = require("cors");

const app = express();

// allow cross origin requests
app.use(cors);
mongoose.connect(
  "mongodb+srv://freecodebootcampuser:freecodebootcampuser@cluster0.4jmy3.mongodb.net/gqlninja"
);

mongoose.connection.once("open", () => {
  console.log("Connected to the database");
});

// Now we setup a middleware
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("Listening on port 4000");
});
