const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();


const {User} = require('../models/user');

router.get('/', (request, response) => {
  response.send('users');
});

router.post('/', (request, response) => {
  const required_fields = ['email', 'password'];
  let missingfields = [];
  for (let i=0; i<required_fields.length; i++) {
    const field = required_fields[i];
    if (!(field in request.body)) {
      missingfields.push('`' + field + '`');
    }
  }

  if (missingfields.length) {
    return response.status(400).send(`Missing ${missingfields.toString()} in request body`);
  }

  User
    .create({
      username: request.body.username,
      first_name: request.body.first_name,
      last_name: request.body.last_name,
      email: request.body.email,
      password: request.body.password,
      Role: "Subscriber"
    })
    .then(User => response.status(201).json(User.apiRepr()))
    .catch(error => {
      console.log(error);
      response.status(500).json({error: 'Could not save User'});
    });
});
module.exports  = router;
