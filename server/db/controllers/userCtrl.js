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
                    res.sendStatus(201);
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
    console.log('inside user login controller');
    db.select().from('users').where('users.username', '=', username)
      .then(rows =>{
        if (rows.length) {
          bcrypt.compare(password, rows[0].password)
            .then(pass => {
              if (pass) {
                req.session.displayName = username;
                req.session.save(() => {
                  //console.log(req.session);
                  res.send(true);
                });
              } else {
                res.send(false);
              }
            });
        } else {
          //console.log(req.session);
          res.send('Please, check Username or Password');
        }
      });
  }, 

  logout: function(req, res) {
    let temp = req.session.displayName;
    res.send('Good bye  ' + temp);
    console.log(req.session);
    req.session.destroy();
    console.log(req.session);
  }
};

