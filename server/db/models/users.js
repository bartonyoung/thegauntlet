const knex = require('../index.js');

module.exports = knex.schema.createTableIfNotExists('users', (user) => {
  user.increments();
  user.string('username');
  user.string('password');
  user.string('location');
  user.integer('followers');
}).then(() => {
  console.log('user table created');
});

