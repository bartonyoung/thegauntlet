const comments = require('../models/followers.js');
const db = require('../index.js');

module.exports = {
  follow: (req, res) => {
    let follow = req.body; //req.body has leader_id
    db.select('id').from('users').where({username: req.session.displayName}).then(userData =>{
      db.select().from('followers').where({user_id: userData[0].id}).andWhere({leader_id: req.body.leader_id}).then((followerData) => {
        if (!followerData.length) {
          follow.user_id = userData[0].id;
          db('followers').insert(follow).then(() => {
            db.select().from('followers').where({leader_id: req.body.leader_id}).then(leaderData => {
              db.select().from('users').where({id: req.body.leader_id}).update({followers: leaderData.length}).then(() => {
                res.sendStatus(201);
              });
            });
          });
        } else {
          res.sendStatus(404);
        }
      });
    });
  },

  getNumberOfFollowers: (req, res) => {
    db.select('users.username', 'users.followers').from('users').where({id: req.query.id}).then((data) => {
      res.json(data[0]);
    });
  },

  // check: (req, res) => {
  //   db.select('id').from('users').where({username: req.session.displayName}).then((userData) => {
  //     db.select().from('followers').where({user_id: userData[0].id}).andWhere({leader_id: req.body.leader_id}).then((followerData) => {
  //       res.json(followerData);
  //     });
  //   });
  // },
  getLeaders: (req, res) => {
    db.select('id').from('users').where({username: req.session.displayName}).then(userData => {
      db.select().from('followers').where({user_id: userData[0].id}).then(leaders => {
        let leaderArray = leaders.map((leader) => {
          return leader.leader_id;
        });
        res.send(leaderArray);
      });
    });
  },

  unFollow: (req, res) => {
    db.select('id').from('users').where({username: req.session.displayName}).then(userData => {
      db('followers').where({user_id: userData[0].id}).andWhere({leader_id: req.body.leader_id}).del().then(() => {
        res.sendStatus(201);
      });
    });
  }

};