const express = require('express');
const router = express.Router();
const multer = require('multer');
const {getMissingFields} = require('../helpers/validation');
const {Stl} = require('./model');

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
    .exec()
    .then(stl => {
      return response.json(stl.toObject({versionKey: false}))
    });
});


router.post('/', (request, response) => {
  const required_fields = ['name'];
  let missingfields = getMissingFields(required_fields, request.body);

  if (missingfields.length) {
    return response.status(400).send(`Missing ${missingfields.toString()} in request body`);
  }

  let stl_file = request.files

  Stl.create({
    name: request.body.name,
    description: request.body.description,
    owner: request.body.owner,
    category: request.body.category,
    tags: Stl.processTags(request.body.tags),
  }).then(Stl => response.status(201).json(Stl.toObject()))
    .catch(error => {
      console.log(error);
      response.status(500).json({error: 'Could not save STL'});
    });
});

router.delete('/:id', (request, response) => {
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

router.put('/:id', (request, response) => {
  if (!(request.params.id && request.body.id && request.params.id === request.body.id)) {
    response.status(400).json({
      error: 'Request path id and request body id values must match'
    });
  }

  const updated = {};
  const updatableFields = ['name', 'description', 'pictures', 'tags'];
});

module.exports = router;
