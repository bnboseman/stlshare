const express = require('express');
const router = express.Router();
const multer = require('multer');
const {getMissingFields} = require('../helpers/validation');
const {Stl} = require('./model');
const passport = require('passport');

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback (null, './uploads');
  },
  filename: (request, file, callback) => {
    callback(null, file.filename)
  }
});

let upload = multer({storage: storage}).array('stlfiles', 6);
router.get('/', (request, response) => {
  Stl
    .find()
    .populate('owner', ['username', 'email', 'first_name', 'last_name', 'Role'])
    .populate('comments.user', ['username', 'email', 'first_name', 'last_name', 'Role'])
    .sort('-created')
    .lean()
    .exec((error, stls)=> {
    if(error) {
      console.error(error);
      return response.status(500).json({"error": error.message});
    }
    return response.status(200).json(stls);
  });

});

router.get('/tag/:tag', (request, response) => {
  Stl
    .find()
    .populate('owner', ['username', 'email', 'first_name', 'last_name', 'Role'])
    .populate('comments.user', ['username', 'email', 'first_name', 'last_name', 'Role'])
    .where('tags').in([request.params.tag])
    .exec((error, stls) => {
      if(error) {
        console.error(error);
        return response.status(500).json({"error": error.message});
      }

      return response.status(200).json(stls);
    });
});

router.get('/:id', (request, response) => {
  Stl.findById(request.params.id)
    .populate('owner', ['username', 'email', 'first_name', 'last_name', 'Role'])
    .populate('comments.user', ['username', 'email', 'first_name', 'last_name', 'Role'])
    .exec()
    .then(stl => {
      return response.json(stl.toObject({versionKey: false}))
    });
});

router.post('/',  passport.authenticate('jwt', { session: false }), (request, response) => {
  const required_fields = ['name', 'description'];

  let missingfields = getMissingFields(required_fields, request.body);

  if (missingfields.length) {
    return response.status(400).json({error: `Missing ${missingfields.map(function(field) { return `\`${field}\`` }).join(', ')} in request body`});
  }


  Stl.create({
    name: request.body.name,
    description: request.body.description,
    owner: request.user.id,
    category: request.body.category,
    tags: Stl.processTags(request.body.tags),
  }).then(Stl => response.status(201).json(Stl.toObject()))
    .catch(error => {
      console.error(error);
      response.status(500).json({error: 'Could not save STL'});
    });
});

router.post('/:id/comment',  passport.authenticate('jwt', { session: false }), (request, response) => {
  const text = request.body.text;
  if (!text) {
    return response.status(500).json({error: "Comment could not be posted"});
  }

  const options = {
    $push: {
      comments: {
      user: request.user.id,
      text: text
    }}
  };
  Stl.findOneAndUpdate({_id: request.body.id}, options, (error, doc) => {
      if(error) {
        console.error(error);
        return response.status(500).json({error: 'Comment could not be posted'});
      }

      return response.status(200).json({sucess: true});
    });
});
router.delete('/:id',  passport.authenticate('jwt', { session: false }), (request, response) => {
  Stl
    .findByIdAndRemove(request.params.id)
    .exec()
    .then(() => {
      response.status(204).json({message: 'Success'});
    })
    .catch(error => {
      console.error(error);
      response.status(500).json({error: 'Could not delete model'});
    });
});

router.put('/:id',  passport.authenticate('jwt', { session: false }), (request, response) => {
  if (!(request.params.id && request.body.id && request.params.id === request.body.id)) {
    response.status(400).json({
      error: 'Request path id and request body id values must match'
    });
  }

  const updated = {};
  const updatableFields = ['name', 'description', 'pictures', 'tags'];
});

module.exports = router;
