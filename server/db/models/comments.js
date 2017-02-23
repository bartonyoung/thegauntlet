const knex = require('../index.js');

module.exports = knex.schema.createTableIfNotExists('comments', (comment) => {
  comment.increments();
  comment.string('comment');
  comment.string('user_id');
  comment.string('challenge_id');
  comment.string('created_at');
  comment.string('username');
}).then(() => {
  console.log('comments table created');
});

