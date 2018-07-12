var express = require('express');
var path = require('path');
var app = express();
var port = 8000;

app.use(express.static(path.join(__dirname, '/')));

// app.use(express.static(path.join(__dirname, '/archive.collection.json')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/archive.html'));
});

app.listen(port, function() {
  console.info(`Listening on ${port}...`);
});
