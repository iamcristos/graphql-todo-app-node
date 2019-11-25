const { gql } = require('apollo-server-express');

const todoSchema = gql`
    type Todo{
        id: ID!
        user: [User]!
        description: String!
        title: Strin!
        done: Boolean
    }

    input NewTodo {
        id: ID!
        user: [User]!
        description: String!
        title: Strin!
        done: Boolean
    }

    input UpdateTodo {
        id: ID!
        user: [User]!
        description: String
        title: Strin
        done: Boolean
    }

    type Query {
        todo: [Todo]!
    }

    type Mutation {
        newTodo(input: NewTodo!): Todo!
        updateTodo(input: UpdateTodo!): Todo!
    }
`;

module.exports = todoSchema;
