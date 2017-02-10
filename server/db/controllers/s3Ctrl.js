var fs = require('fs');
var S3FS = require('s3fs');
var s3fsImpl = new S3FS('thegauntletbucket420', {
  accessKeyId: process.env.accessKeyId, //key here
  secretAccessKey: process.env.secretKeyId //key here
});

module.exports = function(file, res) {
  var stream = fs.createReadStream(file.path);
  return s3fsImpl.writeFile(file.originalFilename, stream).then(function() {
    fs.unlink(file.path, function(err) {});
    res.sendStatus(201);
  });
};