const { ApolloError } = require('apollo-server-express');
const User = require('../models/user');

const getUsers = () => User.find({}).exec();

const newUser = async (_, { input }) => {
  const user = await User.findOne({ $or: [{ username: input.username, email: input.email }] })
    .exec();
  if (user) throw new ApolloError('user already exists');
  return User.create(input);
};

const updateUser = async (_, { input }) => {
  const { id, ...update } = input;
  return User.findByIdAndUpdate(id, update, { new: true }).exec();
};

const userResolvers = {
  Query: {
    getUsers,
  },

  Mutation: {
    newUser,
    updateUser,
  },
};

module.exports = userResolvers;
