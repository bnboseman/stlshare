const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const {User} = require('./model');
const {getMissingFields} = require('../helpers/validation');

router.get('/:id', (request, response) => {
  User.findById(request.params.id)
    .exec()
    .then(user => {
      return response.json(user.apiRepr());
    });
});

router.post('/', (request, response) => {
  const required_fields = ['email', 'password', 'username'];
  let missingfields = getMissingFields(required_fields, request.body);

  if (missingfields.length) {
    return response.status(400).json({error: `Missing ${missingfields.map(function(field) { return `\`${field}\`` }).join(', ')} in request body`});
  }

  const password = request.body.password.trim();


  bcrypt.genSalt((error, salt) => {
    if (error) {
      console.error(error);
      return response.status(500).json({error: 'Internal server error'});
    }

    bcrypt.hash(password, salt, (error, hash) => {
      if (error) {
        console.error(error);
        return response.status(500).json({error: 'Internal server error'});
      }

      User
        .create({
          username: request.body.username,
          firstName: request.body.firstName,
          lastName: request.body.lastName,
          email: request.body.email,
          password: hash,
          role: "User"
        })
        .then(User => response.status(201).json(User.apiRepr()))
        .catch(error => {
          console.log(error);
          response.status(500).json({error: 'Could not save User.'});
        });
    });
  });
});

module.exports  = router;
