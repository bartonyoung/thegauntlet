const knex = require('../index.js');

module.exports = knex.schema.createTableIfNotExists('challenges', function(challenge) {
  challenge.increments();
  challenge.string('title');
  challenge.string('description');
  challenge.string('filename');
  challenge.integer('upvotes');
  challenge.string('category');
  challenge.integer('user_id').unsigned();
}).then(function() {
  console.log('challenge table created');
});

