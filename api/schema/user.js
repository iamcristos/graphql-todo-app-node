const { gql } = require('apollo-server-express');

const userSchema = gql`
    type User{
        id: ID!
        username: String!
        email: String!
    }

    input NewUser {
        username: String!
        email: String!
        password: String!
    }

    input UpdateUser {
        id: ID!
        username: String
        email: String
    }

    type Query {
        getUsers: [User]!
    }

    type Mutation {
        newUser(input: NewUser!): User!
        updateUser(id: ID!, input: UpdateUser!): User!
    }
`;

module.exports = userSchema;
