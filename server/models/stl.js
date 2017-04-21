const mongoose = require('mongoose');
const user = require('./user');

const StlSchema =  new mongoose.Schema({
  name: String,
  description: String,
  owner: mongoose.Schema.Types.ObjectId,
  comments: [
    {
      user: mongoose.Schema.Types.ObjectId,
      text: String
    }
  ],
  license: String,
  category: [String],
  pictures: [{
    order: Number,
    path: String
  }],
  tags: [String],
  created: Date,
  downloads: Number,
  views: Number
});


StlSchema.methods.apiRepr = () => {
  return {
    id: this._id,
    name: this.name,
    description: this.description,
    comments: this.comments,
    license: this.license,
    category: this.category,
    tags: this.tags,
    created: this.created,
    downloads: this.downloads,
    view: this.views
  }
};
const Stl = mongoose.model('User', StlSchema);
module.exports = {Stl};



