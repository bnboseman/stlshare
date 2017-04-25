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
  views: {
    type: Number,
    default: 0
  },
  downloads: {
    type: Number,
    default: 0
  },
  favorites: {
    type: Number,
    default: 0
  }
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

StlSchema.statics.processTags = (tags) => {
  re = /\s{0,},\s{0,1}/;
  return tags.split(re);
}

const Stl = mongoose.model('Stl', StlSchema);
module.exports = {Stl};



