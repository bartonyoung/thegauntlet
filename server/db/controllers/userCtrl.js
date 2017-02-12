const app = require('../../server.js');
const users = require('../models/users.js');
const db = require('../index.js');
const bcrypt = require('promised-bcrypt');

module.exports = {
  signup: function(req, res) {
    let user = req.body;
    let username = user.username;
    let password = user.password;
    db.select().from('users').where({username: username})
      .then(rows =>{
        if (rows.length) {
          res.send(false);
        } else {
          bcrypt.hash(password)
            .then(hash => {
              db('users').insert({username: username, password: hash })
                .then(rows => {
                  req.session.displayName = username;
                  req.session.save(() => {
                   //console.log('username works!', req.session);
                    res.send(req.session.displayName);
                  });
                })    
                .catch(function(err) {
                  console.error(err);
                });
            });
        }
      });
  },

  login: function(req, res) {
    let user = req.body;
    let username = user.username;
    let password = user.password;
    db.select().from('users').where('users.username', '=', username)
      .then(rows =>{
        if (rows.length) {
          bcrypt.compare(password, rows[0].password)
            .then(pass => {
              if (pass) {
                req.session.displayName = username;
                req.session.save(() => {
                  res.send(req.session.displayName);
                });
              } else {
                res.send(false);
              }
            });
        } else {
          res.send('Please, check Username or Password');
        }
      });
  }, 

  logout: function(req, res) {
    let temp = req.session.displayName;
    req.session.destroy();
    res.send('Good bye  ' + temp);
  }
};

