const mongoose = require('mongoose');
const UserSchema =  new mongoose.Schema({
  name: String,
  description: String,
  comments: [
    {
      user: ObjectId,
      text: String
    }
  ],
  downloads: Number,
  views: Number,
  owner: ObjectId,

});

const User = mongoose.model('User', UserSchema);
export User;



