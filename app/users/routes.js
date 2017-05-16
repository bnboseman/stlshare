const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { User } = require('./model');
const { Stl } = require('../stl/model');
const { getMissingFields } = require('../helpers/validation');

router.get('/:id', (request, response) => {
  if (mongoose.Types.ObjectId.isValid(request.params.id)) {
    User.findById(request.params.id)
      .exec()
      .then(user => {
        if (user === null) {
          return response.status(400).json({
            error: `User ${request.params.id} could not be found`
          });
        }
        let userinfo = user.apiRepr();
        Stl.find({owner: userinfo.id})
          .populate('comments.user', ['username', 'email', 'firstName', 'lastName', 'role'])
          .sort('-created')
          .lean()
          .exec((error, stls)=> {
          userinfo.stls = stls;
            return response.json(userinfo);
          });
      });
  } else {
    User.findOne({
        'username': request.params.id
      })
      .exec()
      .then(user => {
        if (user === null) {
          return response.status(400).json({
            error: `User ${request.params.id} could not be found`
          });
        }
        let userinfo = user.apiRepr();
        Stl.find({owner: userinfo.id})
          .populate('comments.user', ['username', 'email', 'firstName', 'lastName', 'role'])
          .sort('-created')
          .lean()
          .exec((error, stls)=> {
            userinfo.stls = stls;
            return response.json(userinfo);
          });
      });
  }
});

router.post('/', (request, response) => {
  const required_fields = ['email', 'password', 'username'];
  let missingfields = getMissingFields(required_fields, request.body);

  if (missingfields.length) {
    return response.status(400).json({
      error: `Missing ${missingfields.map(function(field) { return `\`${field}\`` }).join(', ')} in request body`
    });
  }

  const password = request.body.password.trim();


  bcrypt.genSalt((error, salt) => {
    if (error) {
      console.error(error);
      return response.status(500).json({
        error: 'Internal server error'
      });
    }

    bcrypt.hash(password, salt, (error, hash) => {
      if (error) {
        console.error(error);
        return response.status(500).json({
          error: 'Internal server error'
        });
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
          console.error(error);
          response.status(500).json({
            error: 'Could not save User.'
          });
        });
    });
  });
});

router.post('/authenticate', (request, response) => {
  User.findOne({
    email: request.body.email
  }, (error, user) => {
    if (error) {
      console.log(error);
      response.status(500).json({
        error: 'Could not autenticate User'
      });
    }

    if (!user) {
      return response.json({
        success: false,
        message: 'Authentication failed. User not found.'
      });
    } else if (user) {
      user.validatePassword(request.body.password, (error, isValid) => {
        if (error) {
          return response.status(400).json({
            sucess: false,
            message: 'Authentication failed.'
          });
        }
        if (isValid) {
          const token = jwt.sign(user.apiRepr(), process.env.AUTH_KEY, {
            expiresIn: '24h'
          });

          // return the information including token as JSON
          response.json({
            success: true,
            token: token
          });
        } else {
          return response.status(400).json({
            sucess: false,
            message: 'Authentication failed.'
          });
        }
      });
    }
  })
});

module.exports = router;
