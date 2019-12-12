const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, 'username already exists'],
    required: true,
  },
  email: {
    type: String,
    unique: [true, 'email already exists'],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });


userSchema.pre('save', function (next) {
  const hashPassword = bcrypt.hashSync(this.password, 10);
  this.password = hashPassword;
  next();
});

userSchema.methods.comparePassword = function (password) {
  const user = bcrypt.compareSync(password, this.password);
  // console.log(this, 'mmmmmmmmmmmmm', user);
  return user ? this : null;
};


const User = mongoose.model('User', userSchema);

module.exports = User;
