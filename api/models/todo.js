const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: 'User',
  },

},
{ timestamps: true });

const Todo = mongoose.model('todo', todoSchema);

module.exports = Todo;
