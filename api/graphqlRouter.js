const { ApolloServer, makeExecutableSchema } = require('apollo-server-express');
const express = require('express');
const { merge } = require('lodash');
const { userSchema } = require('./schema');
const { userResolver } = require('./resolvers');


const app = express();

// const {makeExecutableSchema} = require('graphql-tools');

const typeDefs = [
  userSchema,
];

const resolvers = merge(
  {},
  userResolver,
);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
const server = new ApolloServer({
  schema,
  context: ({ req, res }) => ({
    req,
    res,
  }),
});

server.applyMiddleware({ app });

module.exports = { app, server };
