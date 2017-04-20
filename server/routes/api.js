const express = require('express');
const router = express.Router();
const axios = require('axios');
const API = 'http://jsonplaceholder.typicode.com';

// GET API listing
router.get('/', (request, response) => {
  response.send('api works');
});

router.get('/posts', (request, response) => {
  axios.get(`${API}/posts`)
    .then(posts => {
      response.status(200).json(posts.data);
    })
    .catch( error => {
      response.status(500).send(error);
    })
});
module.exports  = router;
