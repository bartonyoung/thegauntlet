const app = require('../../server.js');
const users = require('../models/users.js');
const db = require('../index.js');
const bcrypt = require('promised-bcrypt');

module.exports = {
  signup: function(req, res) {
    let user = req.body;
    let username = user.username;
    let password = user.password;
    let firstname = user.firstname;
    let lastname = user.lastname;
    let email = user.email;
    db.select().from('users').where({username: username})
      .then(rows =>{
        if (rows.length) {
          res.send(false);
        } else {
          bcrypt.hash(password)
            .then(hash => {
              db('users').insert({
                firstname: firstname,
                lastname: lastname,
                email: email,
                username: username,
                password: hash,
                followers: 0
              })
                .then(rows => {
                  req.session.displayName = username;
                  req.session.save((data) => {
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

  getUser: function(req, res) {
    let username = req.params.username || req.session.displayName;
    db.select('users.firstname', 'users.lastname', 'users.email', 'users.profilepic', 'users.username', 'users.followers').from('users').where('username', '=', username).then(data => {
      res.json(data);
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
          res.send(false);
        }
      });
  },

  logout: function(req, res) {
    let temp = req.session.displayName;
    req.session.destroy();
    res.send('Good bye  ' + temp);
  }
};

