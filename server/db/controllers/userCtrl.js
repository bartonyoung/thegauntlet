const app = require('../../server.js');
const users = require('../models/users.js');
const db = require('../index.js');
const bcrypt = require('promised-bcrypt');

module.exports = {
  signup: function(req, res) {
    console.log('inside user signup controller');
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
<<<<<<< 593d166f3e028b90583487763069f959fbd86883
                   //console.log('username works!', req.session);
                    res.sendStatus(201);
                  });
                })    
                .catch(function(err) {
=======
                    console.log("username works!", req.session);
                    // res.redirect('/#/dash');
                    res.send('Welcome');
                  });
                })
                .catch((err) => {
>>>>>>> lints code
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
                 // console.log(req.session);
                  res.send('Welcome');
                });
              } else {
                res.send('Please, check Username or Password');
              }
            });
        } else {
          console.log(req.session);
          res.send('Please, check Username or Password');
        }
      });
  }, 

  logout(req, res) {
    console.log(req.session);
    delete req.session.displayName;
    console.log('============================');
    console.log(req.session);
    res.send('Good bye');
  },
};
