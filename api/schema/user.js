const { gql } = require('apollo-server-express');

const userSchema = gql`
    type User{
        id: ID!
        username: String!
        email: String!
        token: String
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

    input LoginUser {
        username: String!
        password: String!
    }

    type Query {
        getUsers: [User]!
        loginUser(input: LoginUser!): User!
    }

    type Mutation {
        newUser(input: NewUser!): User!
        updateUser(id: ID!, input: UpdateUser!): User!
    }
`;

module.exports = userSchema;
