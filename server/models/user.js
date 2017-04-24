const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema =  new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  first_name: String,
  last_name: String,
  email: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  password: {
    type: String,
    required: true,
  },
  Role: {
    type: String,
    enum: ['Admin','User','Banned','Mod','GAdmin','Unconfirmed']

  },
  Favorites: [mongoose.Schema.Types.ObjectId],
  Active: Boolean
});
UserSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    username: this.username,
    first: this.first_name,
    last: this.last_name,
    email: this.email,
    role: this.role,
    favorites: this.favorites
  }
};

UserSchema.methods.validatePassword = function(password, callback) {
  bcrypt.compare(password, this.password, (err, isValid) => {
    if (err) {
      callback(err);
      return;
    }

    callback(null, isValid);
  });
};

const User = mongoose.model('User', UserSchema);

module.exports = {User};
