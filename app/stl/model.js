const mongoose = require('mongoose');
const _ = require('lodash');

const StlSchema =  new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      text: String,
      created: {
        type: Date,
        default: Date.now
      }
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
  files: [String],
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


StlSchema.methods.apiRepr = function() {
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

StlSchema.statics.findByOwner = function(id, callback) {
  return this.find({owner: id}, callback);
}

StlSchema.statics.processTags = function(tags) {
  re = /\s{0,},\s{0,1}/;
  return _.split(tags, re);
}

let  autoOwnerAndComments = function(next) {
  this.populate('owner', ['username', 'email', 'firstName', 'lastName', 'role']);
  this.populate('comments.user', ['username', 'email', 'firstName', 'lastName', 'role']);
  next();
};

StlSchema
  .pre('find', autoOwnerAndComments)
  .pre('findOneAndUpdate', autoOwnerAndComments)
  .pre('findOne', autoOwnerAndComments)
  .pre('findById', autoOwnerAndComments);

const Stl = mongoose.model('Stl', StlSchema);
module.exports = {Stl};



