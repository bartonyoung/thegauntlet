const knex = require('../index.js');

module.exports = knex.schema.createTableIfNotExists('chats', (chat) => {
  chat.increments();
  chat.string('fromUsername');
  chat.string('toUsername');
}).then(function() {
  console.log('chat table created');
});

