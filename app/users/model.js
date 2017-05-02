const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  firstName: String,
  lastName: String,
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
  role: {
    type: String,
    enum: ['Admin', 'User', 'Banned', 'Mod', 'GAdmin', 'Unconfirmed']
  },
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stl'
  }],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stl'
  }]
});
UserSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    username: this.username,
    first: this.firstName,
    last: this.lastName,
    email: this.email,
    role: this.role,
    favorites: this.favorites
  }
};

UserSchema.methods.isActive = function() {
  switch (this.role) {
    case 'Admin':
    case 'User':
    case 'Mod':
    case 'GAdmin':
      return true;
      break;
    default:
      return false;
  }
}

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

module.exports = {
  User
};