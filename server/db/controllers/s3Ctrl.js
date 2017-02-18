
var fs = require('fs');
var S3FS = require('s3fs');
var s3fsImpl = new S3FS('thegauntletbucket421', {
  accessKeyId: process.env.accessKeyID,
  secretAccessKey: process.env.secretAccessKey
});

module.exports = function(file, res) {
  var stream = fs.createReadStream(file.path);
  return s3fsImpl.writeFile(file.originalFilename, stream).then(function() {
    fs.unlink(file.path, function(err) {
      if (err) {
        console.error(err);
      }
    });
    res.json(file.originalFilename);
  });
};