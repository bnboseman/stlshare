require('dotenv').config();

// Get dependancies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Get API Resources
const api = require('./server/routes/api');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

mongoose.Promise = global.Promise;

// Point static patch to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

// Catch all other routs and return the index file
app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || '3000';
app.set('port', port);

let server;

// Create the http server
//const server = http.createServer(app);
function runServer() {
  return new Promise((resolve, reject) => {

    mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`, err => {
      if (err) {
        return reject(err);
      }

      server = app.listen(process.env.PORT, () => {
        console.log(`API running on localhost: ${port}`);
        resolve();
      })
        .on('errohr', err => {
          mongoose.disconnect();
          reject(err);
        })
    });
  })
}

// Listen on provide port, on all network interfaces
server.listen(port, () => {
});
