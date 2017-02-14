const challenges = require('../models/challenges.js');
const votes = require('../models/votes.js');
const db = require('../index.js');
const s3 = require('./s3Ctrl.js');

module.exports = {
  addOne: (req, res) => {
    const challenge = req.body;
    db.select('id')
    .from('users')
    .where({username: req.session.displayName})
    .then(userData => {
      challenge.user_id = userData[0].id;
      challenge.upvotes = 0;
      challenge.views = 0;
      db('challenges').insert(challenge).then(data => {
        db.select().from('challenges').then(data => {
          res.json(data);
        });
        // res.sendStatus(201);
      }).catch(err => {
        if (err) { console.error(err); }
      });
    });
  },

  addOneResponse: (req, res) => {
    const challenge = req.body;
    db.select('id')
    .from('users')
    .where({username: req.session.displayName})
    .then(userData => {
      challenge.parent_id = challenge.parent_id;
      challenge.user_id = userData[0].id;
      challenge.upvotes = 0;
      challenge.views = 0;
      db('challenges').insert(challenge).then(data => {
        res.sendStatus(201);
      }).catch(err => {
        if (err) { console.error(err); }
      });
    });
  },

  s3: (req, res) => {
//     s3(req.files.video, res);
    res.json(req.files.video.originalFilename); //delete on deploy
  },

  getAll: (req, res) =>{
    db.select().from('challenges').then(data =>{
      res.json(data);
    });
  },

  getOne: (req, res) => {
    db.select()
    .from('challenges')
    .where({parent_id: req.query.parent_id})
    .orWhere({id: req.query.parent_id})
    .then(data =>{
      res.json(data);
    })
    .catch((err) => {
      if (err) { console.error(err); }
    });
  },

  getSomeonesSubmissions: (req, res) => {
    let name = req.query.username || req.session.displayName;
    db.from('users')
    .innerJoin('challenges', 'users.id', 'challenges.user_id')
    .where({username: name})
    .then((data) => {
      res.json(data); //data is an array of all challenges that user responded to
    });
  },

  upvote: (req, res) => { //CHECK: Should fix upvote spam but needs to be tested
    let vote = req.body; //req.body should have challenge_id and vote = 1
    db.select().from('users').where({username: req.session.displayName}).then(userData => {
      db.select().from('votes').where({user_id: userData[0].id}).andWhere({challenge_id: req.body.challenge_id}).then(exists => {
        if (exists.length) {
          res.sendStatus(404);
        } else {
          vote.user_id = userData[0].id;
          db('votes').insert(vote).then( () => {
            db.select().from('votes').where({challenge_id: req.body.challenge_id}).then((voteData) => {
              db.from('challenges').where({id: req.body.challenge_id}).update({upvotes: voteData.length}).then(() => {
                res.sendStatus(201);
              });
            });
          });
        }
      });
    });
  },

  viewed: (req, res) => {
    db.select('views').from('challenges').where({id: req.body.challenge_id}).then(challengeData => {
      db.select().from('challenges').where({id: req.body.challenge_id}).update({views: challengeData[0].views + 1}).then( () => {
      });
    });
  }
};
