// Create web server
// Load the comments
// Save the comments
// Delete the comments
// Update the comments

// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

// Create the web server
var app = express();

// Set the port
var port = 3000;

// Load the comments
var comments = [];
fs.readFile('comments.json', function(err, data) {
  if (err) {
    console.log(err);
  } else {
    comments = JSON.parse(data);
  }
});

// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

// Routes
app.get('/comments', function(req, res) {
  res.json(comments);
});

app.post('/comments', function(req, res) {
  var comment = req.body;
  comments.push(comment);
  fs.writeFile('comments.json', JSON.stringify(comments), function(err) {
    if (err) {
      console.log(err);
    }
  });
  res.json(comment);
});

app.delete('/comments/:index', function(req, res) {
  var index = req.params.index;
  comments.splice(index, 1);
  fs.writeFile('comments.json', JSON.stringify(comments), function(err) {
    if (err) {
      console.log(err);
    }
  });
  res.json(comments);
});

app.put('/comments/:index', function(req, res) {
  var index = req.params.index;
  comments[index] = req.body;
  fs.writeFile('comments.json', JSON.stringify(comments), function(err) {
    if (err) {
      console.log(err);
    }
  });
  res.json(comments);
});

// Start the server
app.listen(port, function() {
  console.log('Server started on http://localhost:' + port);
});