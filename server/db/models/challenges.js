const knex = require('../index.js');

module.exports = knex.schema.createTableIfNotExists('challenges', (challenge) => {
  challenge.increments();
  challenge.string('title');
  challenge.string('description');
  challenge.integer('parent_id');
  challenge.string('filename');
  challenge.integer('upvotes');
  challenge.string('createTime');
  challenge.string('category');
  challenge.integer('user_id').references('id').inTable('users');
}).then(function() {
  console.log('challenge table created');
});

