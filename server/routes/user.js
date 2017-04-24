const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');


const {User} = require('../models/user');
const {getMissingFields} = require('../helpers/validation');

router.post('/', (request, response) => {
  const required_fields = ['email', 'password', 'username'];
  let missingfields = getMissingFields(required_fields, request.body);

  if (missingfields.length) {
    return response.status(400).send(`Missing ${missingfields.toString()} in request body`);
  }

  const password = request.body.password.trim();


  bcrypt.genSalt((err, salt) => {
    if (err) {
      return response.status(500).json({error: 'Internal server error'});
    }

    bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        return response.status(500).json({error: 'Internal server error'});
      }

      User
        .create({
          username: request.body.username,
          first_name: request.body.first_name,
          last_name: request.body.last_name,
          email: request.body.email,
          password: hash,
          Role: "Subscriber"
        })
        .then(User => response.status(201).json(User.apiRepr()))
        .catch(error => {
          console.log(error);
          response.status(500).json({error: 'Could not save User'});
        });
    });
  });
});

router.post('/login', (request, response) => {

});
module.exports  = router;
