const challenges = require('../models/challenges.js');
const db = require('../index.js');
const s3 = require('./s3Ctrl.js');

module.exports = {
  addOne: (req, res) => {
    const challenge = req.body;
    console.log(req.session.displayName);
    db.select('id')
    .from('users')
    .where({username: 'Scott'})
    .then(userData => { //TODO:Change to req.session.username
      challenge.user_id = userData[0].id;
      challenge.upvotes = 0;
      challenge.filename = req.files.video.originalFilename;
      db('challenges').insert(challenge).then(data => { 
        s3(req.files.video, res);
      }).catch(err => { 
        if (err) { console.error(err); }
      }); 
    });
  },
  
  getAll: (req, res) =>{
    db.select().from('challenges').then(data =>{
      console.log(data);
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
      res.json(data); //data is an array of all challenges he responded to
    });
  },

  upvote: (req, res) => { //FIX_ME: can be upvoted to oblivion
    db.from('challenges').where({id: req.body.challenge_id}).then(data => {
      db.from('challenges').where({id: req.body.challenge_id}).update({upvotes: data[0].upvotes + 1}).then(() => {
        res.sendStatus(201);
      });
    });
  }
};      