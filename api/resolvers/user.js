const { ApolloError } = require('apollo-server-express');
const User = require('../models/user');
const { generateToken } = require('../utils/auth');

const getUsers = () => User.find({}).exec();
const newUser = async (_, { input }) => {
  const user = await User.findOne({ $or: [{ username: input.username, email: input.email }] })
    .exec();
  if (user) throw new ApolloError('user already exists');
  return User.create(input);
};

const updateUser = async (_, { input }, ctx) => {
  const { id, ...update } = input;
  if (!ctx.user) throw new ApolloError('authentication required');
  return User.findByIdAndUpdate(ctx.user.id, update, { new: true }).exec();
};

const loginUser = async (_, { input }) => {
  const user = await User.findOne({ username: input.username }).exec();
  const login = user.comparePassword(input.password);
  if (!login) {
    throw new ApolloError('invalid credentials');
  }
  return { ...login, token: generateToken(login) };
};

const userResolvers = {
  Query: {
    getUsers,
    loginUser,
  },

  Mutation: {
    newUser,
    updateUser,
  },
};

module.exports = userResolvers;
