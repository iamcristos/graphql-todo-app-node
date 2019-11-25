const mongoose = require('mongoose');

const mongoConnection = (url) => mongoose.connect(url, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));

db.once('open', () => {
  console.log('hello database');
});

module.exports = mongoConnection;
