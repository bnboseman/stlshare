const mongoose = require('mongoose');
const schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  role: String,
  created: Date
});
