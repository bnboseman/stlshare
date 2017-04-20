require('dotenv').config();

// Get dependancies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

//Get API Resources
const api = require('./server/routes/api');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

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

// Create the http server
const server = http.createServer(app);

// Listen on provide port, on all network interfaces
server.listen(port, () => {
  console.log(`API running on localhost: ${port}`)
});
