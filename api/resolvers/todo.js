const Todo = require('../models/todo');

const todos = () => Todo.find({}).exec();

const newTodo = (_, { input }) => Todo.create(input);

const updateTodo = (_, { id, input }) => Todo.update(id, input, { new: true }).exec();

const todoResolvers = {
  Query: {
    todos,
  },

  Mutation: {
    newTodo,
    updateTodo,
  },

  Todo: {
    async user(todoItem) {
      const letme = await todoItem.populate('user').execPopulate();
      return letme.user;
    },
  },
};

module.exports = todoResolvers;
