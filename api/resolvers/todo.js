const Todo = require('../models/todo');

const todos = () => Todo.find({}).exec();

const todo = (_, { id }) => Todo.findById(id).exec();

const newTodo = (_, { input }) => Todo.create(input);

const updateTodo = (_, { id, input }) => Todo.update(id, input, { new: true }).exec();

const todoResolvers = {
  Query: {
    todos,
    todo,
  },

  Mutation: {
    newTodo,
    updateTodo,
  },

  Todo: {
    async user(todoItem) {
      const user = await todoItem.populate('user').execPopulate();
      console.log(user);
      return user.user;
    },
  },
};

module.exports = todoResolvers;
