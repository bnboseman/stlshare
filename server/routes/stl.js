const express = require('express');
const router = express.Router();
const multer = require('multer');
const {getMissingFields} = require('../helpers/validation');
const {Stl} = require('../models/stl');

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
  Stl.find().sort('-created').exec((err, stls)=> {
    return response.status(200).json(stls);
  });

});

router.get('/:id', (request, response) => {
  Stl.findById(request.params.id)
    .exec()
    .then(stl => response.json(stl.toObject({versionKey: false})))
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
    tags: request.body.tags.split(','),
  }).then(Stl => response.status(201).json(Stl.toObject()))
    .catch(error => {
      console.log(error);
      response.status(500).json({error: 'Could not save STL'});
    });

});

module.exports = router;
