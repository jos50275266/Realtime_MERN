const { ApolloServer } = require("apollo-server-express");
const http = require("http");
const path = require("path");
const mongoose = require("mongoose");
const express = require('express');
const { mergeTypeDefs, mergeResolvers, loadFilesSync } = require("graphql-tools");

require('dotenv').config();

// Invoke Express
const app = express();

// Database
const db = async () => {
    try {
      const success = await mongoose.connect(`${process.env.DATABASE_CLOUD}`, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: false
      });
      console.log('DB Connected...')
    } catch (error) {
      console.log('DB Connection Error...', error);
    }
}

// Execute Database Connection
db();

// typeDefs
const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, './typeDefs')));

// resolvers
const resolvers = mergeResolvers(loadFilesSync(path.join(__dirname, './resolvers')))

// graphql server
const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
});

// Apply Middleware method to connects ApolloServer to a specific HTTP Framework ie: express
// this express server itself applies for graphql server
apolloServer.applyMiddleware({ app });

// server - Pass this express server to this http server
// const httpServer = http.createServer(app);

// Rest Endpoint
app.get('/rest', (req, res) => {
    return res.json({
        data: 'You hit rest endpoint...'
    });
});

// PORT
app.listen(process.env.PORT, () => {
    console.log(`server is listening on PORT http://localhost:${process.env.PORT}`);
    console.log(`graphql server is listening on PORT http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`);
});