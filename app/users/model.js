const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Stl } = require('../stl/model');

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
  }],
  stls: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stl'
  }]
});

UserSchema.methods.apiRepr = function() {
    return {
      id: this._id,
      username: this.username,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      role: this.role,
      favorites: this.favorites,
      likes: this.likes
    };
  return promise;
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

let  autoFavoritesAndLikes = function(next) {
  this.populate('favorites', ['name', 'description', 'category', 'pictures', 'tags']);
  this.populate('likes', ['name', 'description', 'category', 'pictures', 'tags']);
  next();
};

UserSchema
  .pre('findOne', autoFavoritesAndLikes)
  .pre('findById', autoFavoritesAndLikes);

const User = mongoose.model('User', UserSchema);

module.exports = {
  User
};
