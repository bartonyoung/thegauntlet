const mysql = require('mysql');
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: process.env.DATABASE_HOST || '127.0.0.1',
    user: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE_URL || 'thegauntlet'
  },
  useNullAsDefault: true
});

module.exports = knex;