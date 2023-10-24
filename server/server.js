require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const path = require("path");
const { authMiddleware } = require("./utils/auth");
const axios = require("axios");

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// app.get("/test", (req, res) => {
//   const API_KEY = "OTZjMzkxZDg0NTE4NGUwNjUyZGVhMm";
//   const url = `https://api.willyweather.com.au/v2/${API_KEY}/search.json?query=Sydney`;
//   const getLocations = () => {
//     return axios.get(url);
//   };

//   getLocations().then((response) => {
//     console.log(response);
//     res.json(response.data);
//   });
// });

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: authMiddleware,
    })
  );

  // if we're in production, serve client/build as static assets
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();
