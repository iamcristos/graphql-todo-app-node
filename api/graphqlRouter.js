const { ApolloServer, makeExecutableSchema } = require('apollo-server-express');
const express = require('express');
const { merge } = require('lodash');
const { userSchema, todoSchema } = require('./schema');
const { userResolver, todoResolver } = require('./resolvers');
const { authenticate } = require('./utils/auth');


const app = express();

// const {makeExecutableSchema} = require('graphql-tools');
const rootSchema = `
    schema {
      query: Query
      mutation: Mutation
    }
  `;
const typeDefs = [
  userSchema,
  todoSchema,
];

const resolvers = merge(
  {},
  userResolver,
  todoResolver,
);

const schema = makeExecutableSchema({
  typeDefs: [rootSchema, ...typeDefs],
  resolvers,
});
const server = new ApolloServer({
  schema,
  context: async ({ req }) => ({
    req,
    user: await authenticate(req.headers.authorization),
  }),
});

server.applyMiddleware({ app });

module.exports = { app, server };
