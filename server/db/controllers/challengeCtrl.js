const challenges = require('../models/challenges.js');
const votes = require('../models/votes.js');
const db = require('../index.js');
const s3 = require('./s3Ctrl.js');

module.exports = {
  addOne: (req, res) => {
    const challenge = req.body;
    console.log(req.session.displayName);
    console.log(req.body);
    db.select('id')
    .from('users')
    .where({username: req.session.displayName})
    .then(userData => {
      challenge.user_id = userData[0].id;
      challenge.upvotes = 0;
      challenge.views = 0;
      challenge.filename = req.files.video.originalFilename;
      db('challenges').insert(challenge).then(data => {
        //s3(req.files.video, res);
        res.redirect('/#/dash');
      }).catch(err => {
        if (err) { console.error(err); }
      });
    });
  },

  getAll: (req, res) =>{
    db.select('*').from('challenges').then(data =>{
      console.log("inside get all", data);
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
    }).catch(err => {
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
          console.log('Sorry you already upvoted this challenge!');
          res.sendStatus(404);
        } else {
          vote.user_id = userData[0].id;
          db('votes').insert(vote).then( () => {
            db.select().from('votes').where({challenge_id: req.body.challenge_id}).then((voteData) => {
              db.from('challenges').where({id: req.body.challenge_id}).update({upvotes: voteData.length}).then(() => {
                console.log('successfully upvoted!');
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
        console.log('view count updated!');
      });
    });
  }
};