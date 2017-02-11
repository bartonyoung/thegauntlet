const knex = require('../index.js');

module.exports = knex.schema.createTableIfNotExists('challenges', (challenge) => {
  challenge.increments();
  challenge.string('title');
  challenge.string('description');
  challenge.integer('parent_id');
  challenge.string('filename');
  challenge.integer('upvotes');
  challenge.timestamp('created_at').defaultTo(knex.fn.now());
  challenge.string('category');
  challenge.integer('user_id').unsigned().references('id').inTable('users').onUpdate().onDelete();
}).then(function() {
  console.log('challenge table created');
});

