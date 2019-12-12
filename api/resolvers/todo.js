const { ApolloError } = require('apollo-server-express');
const { merge } = require('lodash');
const Todo = require('../models/todo');

const todos = () => Todo.find({}).exec();

const todo = (_, { id }) => Todo.findById(id).exec();

const newTodo = (_, { input }, ctx) => {
  if (!ctx.user) throw new ApolloError('authentication required');
  return Todo.create({ ...input, user: ctx.user.id });
};

const updateTodo = async (_, { id, input }, ctx) => {
  if (!ctx.user) throw new ApolloError('authentication required');

  const todoToUpdate = await Todo.findById(id).exec();
  if (todoToUpdate.user != ctx.user.id) {
    throw new Error("you don't have write");
  }
  merge(todoToUpdate, input);
  return todoToUpdate.save();
  // return Todo.update(id, input, { new: true }).exec();
};

const deleteTodo = async (_, { id }, ctx) => {
  if (!ctx.user) throw new ApolloError('authentication required');

  const todoToDelete = await Todo.findById(id).exec();
  if (todoToDelete.user != ctx.user.id) {
    throw new Error("you don't have write");
  }
  return todoToDelete.remove();
};

const todoResolvers = {
  Query: {
    todos,
    todo,
  },

  Mutation: {
    newTodo,
    updateTodo,
    deleteTodo,
  },

  Todo: {
    async user(todoItem) {
      const user = await todoItem.populate('user').execPopulate();
      return user.user;
    },
  },
};

module.exports = todoResolvers;
