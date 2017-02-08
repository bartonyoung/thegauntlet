var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './client/public')));

var port = process.env.PORT || 8000;
app.listen(port, function() {
  console.log("Gauntlet server listening on port:", port);
})