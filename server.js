var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var fs = require('fs');
var S3FS = require('s3fs');
var s3fsImpl = new S3FS('thegauntletbucket420', {
  accessKeyId: '', //key here
  secretAccessKey: '' //key here
});

var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();

var app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, './client/public')));
app.use(multipartyMiddleware);

//TEMPORARY ROUTE TO POST TO AWS S3
app.post('/api/userUpload', function(req, res) {
  var file = req.files.video;
  console.log(req.files.video.path);
  var stream = fs.createReadStream(file.path);
  return s3fsImpl.writeFile(file.originalFilename, stream).then(function() {
    fs.unlink(file.path, function(err) {
      if (err) {
        console.error(err);
      } 
    });
    res.end('Something happned IDK');
  });
});

var port = process.env.PORT || 8000;
app.listen(port, function() {
  console.log('Gauntlet server listening on port:', port);
});