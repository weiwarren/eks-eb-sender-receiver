// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { parse } = require('querystring');

// Create an Express app
const app = express();

// Use body-parser middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: false }));

// Handle POST requests
app.post('/', (req, res) => {
  const parsedData = parse(req.body);
  // Handle the POST request data here

// Handle the JSON string here
console.log(req.body);
  res.send(req.body);
});

// Handle all other requests
app.all('*', (req, res) => {
  res.send('Server is listening for POST requests');
});

// Listen on port 8080
app.listen(8080, () => {
  console.log('Server listening on port 8080');
});
