const app = require('../../server.js');
const users = require('../models/users.js');
const db = require('../index.js');
const bcrypt = require('promised-bcrypt');

module.exports = {
  signup: function(req, res) {
    let user = req.body;
    let username = user.username;
    let password = user.password;
  
    db.select().from('users').where('users.username','=',username)
      .then(rows =>{
        if(rows.length){
          console.log(req.session);
          res.send("username is alreadt exist");
        }else{ 
          bcrypt.hash(password)
            .then(hash => {
              db('users').insert({username:username,password:hash})
                .then(rows => {
                  req.session.displayName = username; 
                  req.session.save(() => {
                    console.log(req.session);
                    res.send('Welcome');
                  })
                })
                .catch(function(err) {
                  console.error(err);
                });
            })
          }
        });  
  },

  signin: function(req, res) {
    let user = req.body;
    let username = user.username;
    let password = user.password;
    //console.log(req.body);
    db.select().from('users').where('users.username','=',username)
      .then(rows =>{
        if(rows.length){
          bcrypt.compare(password,rows[0].password)
            .then(pass => {
              if(pass) {
                req.session.displayName = username;
                req.session.save(() => {
                  console.log(req.session);
                  res.send('Welcome');
                })
              }else{
                res.send('Please, check Username or Password');      
              }
            });
        }else{
          console.log(req.session);
          res.send('Please, check Username or Password');
        }
      });
  },

  logout: function(req, res) {
    console.log(req.session);
    delete req.session.displayName;
    console.log("============================")
    console.log(req.session);
    res.send('Good bye');
  }
};