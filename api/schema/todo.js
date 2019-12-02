const { gql } = require('apollo-server-express');

const todoSchema = gql`
    type Todo{
        id: ID!
        user: User!
        description: String!
        title: String!
        done: Boolean
        createdAt: String
        updatedAt: String
    }

    input NewTodo {
        user: String!
        description: String!
        title: String!
        done: Boolean
    }

    input UpdateTodo {
        id: ID!
        user: String!
        description: String
        title: String
        done: Boolean
        updatedAt: String
    }

    extend type Query {
        todos: [Todo]!
        todo(id: ID!): Todo!
    }

    extend type Mutation {
        newTodo(input: NewTodo!): Todo!
        updateTodo(id: ID! input: UpdateTodo!): Todo!
    }
`;

module.exports = todoSchema;
