const mongoose = require('mongoose');

const UserSchema =  new mongoose.Schema({
  username: String,
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  Role: String,
  favorites: [mongoose.Schema.Types.ObjectId],
});
UserSchema.methods.apiRepr = () => {
  return {
    id: this._id,
    username: this.username,
    first: this.first_name,
    last: this.last_name,
    email: this.email,
    role: this.role,
    favorites: this.favorites
  }
}
const User = mongoose.model('User', UserSchema);

module.exports = {User};
