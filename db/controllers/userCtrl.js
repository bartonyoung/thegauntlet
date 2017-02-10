const users = require('../models/users.js');
const db = require('../index.js');
module.exports = {
  signup: function(req, res) {
    let user = req.body;
    db('users').insert(user).then(function(data) {
      res.sendStatus(201);
    }).catch(function(err) {
      console.error(err);
    });
  },

  signin: function(req, res) {
    
  }
};