
var fs = require('fs');
var S3FS = require('s3fs');
var s3fsImpl = new S3FS('thegauntletbucket421', {
  accessKeyId: process.env.accessKeyID, //key here
  secretAccessKey: process.env.secretAccessKey //key here
});

module.exports = function(file, res) {
  var stream = fs.createReadStream(file.path);
  return s3fsImpl.writeFile(file.originalFilename, stream).then(function() {
    fs.unlink(file.path, function(err) {});
    res.json(file.originalFilename);
  });
};