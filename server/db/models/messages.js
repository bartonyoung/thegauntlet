const knex = require('../index.js');

module.exports = knex.schema.createTableIfNotExists('messages', (message) => {
  message.increments('message_id');
  message.string('message');
  message.string('fromUser_id');
  message.string('toUser_id');
  message.string('created_at');
  message.boolean('read');
  message.integer('parent_id');
}).then(() => {
  console.log('messages table created');
});
