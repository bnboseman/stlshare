const mongoose = require('mongoose');

const StlSchema =  new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  owner: mongoose.Schema.Types.ObjectId,
  comments: [
    {
      user: mongoose.Schema.Types.ObjectId,
      text: String
    }
  ],
  license: String,
  category: {
    type: String,
    enum: ['Architecture','Education', 'Home & Office', 'Other', 'Science', 'Technology','Toys'],
  },
  pictures: [{
    order: Number,
    path: String
  }],
  tags: {
    type: [String],
    index: true
  },
  created: {
    type: Date,
    default: Date.now
  },
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
const Stl = mongoose.model('Stl', StlSchema);
module.exports = {Stl};



