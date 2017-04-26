const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');

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
      return response.status(500).json({error: 'Internal server error'});
    }

    bcrypt.hash(password, salt, (error, hash) => {
      if (error) {
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

router.post('/authenticate', (request, response) => {
  console.log(request.body);
  User.findOne({
    email: request.body.email
  }, (error, user) => {
    if (error) {
      console.log(error);
      response.status(500).json({error: 'Could not autenticate User'});
    }

    if (!user) {
      return response.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
      user.validatePassword(request.body.password, (error, isValid) => {
        if (error) {
          return response.status.json({sucess: false, message: 'Authentication failed.'});
        }
        if (isValid) {
          const token = jwt.sign(user, '2342342', {
            expiresInMinutes: 1440 // expires in 24 hours
          });

          // return the information including token as JSON
          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
          });
        }
      });
    }
  })
});
module.exports  = router;
