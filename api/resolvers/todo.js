const Todo = require('../models/todo');

const todos = () => Todo.find({}).exec();

const todo = (_, { id }) => Todo.findById(id).exec();

const newTodo = (_, { input }) => Todo.create(input);

const updateTodo = (_, { id, input }) => Todo.update(id, input, { new: true }).exec();

const todoResolvers = {
  Query: {
    todos,
    todo
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
