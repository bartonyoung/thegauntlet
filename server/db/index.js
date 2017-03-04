const mysql = require('mysql');
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    // host: process.env.DATABASE_HOST,
    user: 'root',
    // user: process.env.DATABASE_USER,
    password: '',
    // password: process.env.DATABASE_PASSWORD,
    database: 'thegauntlet'
    // database: process.env.DATABASE_URL
  },
  useNullAsDefault: true
});

module.exports = knex;