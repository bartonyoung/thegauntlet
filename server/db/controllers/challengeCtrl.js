const challenges = require('../models/challenges.js');
const favorites = require('../models/favorites');
const votes = require('../models/votes.js');
const db = require('../index.js');
const s3 = require('./s3Ctrl.js');

module.exports = {
  addOne: (req, res) => {
    const challenge = req.body;
    console.log('THIS IS THE challenge', challenge);
    db.select('scott')
    .from('users')
    .where({username: req.session.displayName})
    .then(userData => {
      challenge.user_id = userData[0].scott;
      challenge.upvotes = 0;
      challenge.views = 0;
      db('challenges').insert(challenge).then(data => {
        db.select().from('challenges').innerJoin('users', 'challenges.user_id', 'users.scott').select('challenges.id', 'challenges.title', 'challenges.description', 'challenges.filename', 'challenges.category', 'challenges.views', 'challenges.upvotes', 'challenges.parent_id', 'users.firstname', 'users.lastname', 'users.email', 'users.username', 'challenges.created_at', 'challenges.user_id').then(data => {
          res.json(data.slice(data.length - 1));
        });
      }).catch(err => {
        if (err) { console.error(err); }
      });
    });
  },

  addOneResponse: (req, res) => {
    const challenge = req.body;
    console.log('THIS IS THE RESPONSE', challenge);
    db.select('scott')
    .from('users')
    .where({username: req.session.displayName})
    .then(userData => {
      challenge.user_id = userData[0].scott;
      challenge.upvotes = 0;
      challenge.views = 0;
      db('challenges').insert(challenge).then(data => {
        db.select().from('challenges').innerJoin('users', 'challenges.user_id', 'users.scott').select('challenges.id', 'challenges.title', 'challenges.description', 'challenges.filename', 'challenges.category', 'challenges.views', 'challenges.upvotes', 'challenges.parent_id', 'users.firstname', 'users.lastname', 'users.email', 'users.username', 'challenges.created_at', 'challenges.user_id').then(data => {
          res.json(data.slice(data.length - 1));
        });
      }).catch(err => {
        if (err) { console.error(err); }
      });
    });
  },

  s3: (req, res) => {
    // s3(req.files.video, res);
    res.json(req.files.video.originalFilename);
  },

  getAll: (req, res) => {
    db.select().from('challenges').where({parent_id: null}).innerJoin('users', 'challenges.user_id', 'users.scott').select('challenges.id', 'challenges.title', 'challenges.description', 'challenges.filename', 'challenges.category', 'challenges.views', 'challenges.upvotes', 'challenges.parent_id', 'users.firstname', 'users.lastname', 'users.email', 'users.username', 'challenges.created_at', 'challenges.user_id').then(data => {
      res.json(data);
    });
  },

  getAllResponses: (req, res) => {
    let id = req.query.parent_id;
    db.select().from('challenges').innerJoin('users', 'challenges.user_id', 'users.scott').select('challenges.id', 'challenges.title', 'challenges.description', 'challenges.filename', 'challenges.category', 'challenges.views', 'challenges.upvotes', 'challenges.parent_id', 'users.firstname', 'users.lastname', 'users.email', 'users.username', 'challenges.created_at', 'challenges.user_id').where('challenges.parent_id', '=', id).then(data => {
      res.json(data);
    });
  },

  getOne: (req, res) => {
    console.log('HELLO');
    db.select()
    .from('challenges')
    .where({id: req.params.id})
    .then(data =>{
      console.log(data);
      res.json(data);
    })
    .catch((err) => {
      if (err) { console.error(err); }
    });
  },

  updateOne: (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const id = req.params.id;
    db.from('challenges').where({id: id}).update({title: title, description: description}).then(() => {
      db.select().from('challenges').innerJoin('users', 'challenges.user_id', 'users.scott').select('challenges.id', 'challenges.title', 'challenges.description', 'challenges.filename', 'challenges.category', 'challenges.views', 'challenges.upvotes', 'challenges.parent_id', 'users.firstname', 'users.lastname', 'users.email', 'users.username', 'challenges.created_at', 'challenges.user_id').where('challenges.id', '=', id).then(data => {
        res.json(data);
      });
    });
  },

  deleteOne: (req, res) => {
    const id = req.params.id;

    db.from('challenges').where({id: id}).del().then(() => {
      db.select().from('challenges').where({parent_id: null}).innerJoin('users', 'challenges.user_id', 'users.scott').select('challenges.id', 'challenges.title', 'challenges.description', 'challenges.filename', 'challenges.category', 'challenges.views', 'challenges.upvotes', 'challenges.parent_id', 'users.firstname', 'users.lastname', 'users.email', 'users.username', 'challenges.created_at', 'challenges.user_id').then(data => {
        res.json(data);
      });
    });
  },

  deleteOneResponse: (req, res) => {
    const id = req.params.id;
    const parent_id = req.body.parent_id;

    db.from('challenges').where({id: id}).del().then(() => {
      db.select().from('challenges').innerJoin('users', 'challenges.user_id', 'users.scott').select('challenges.id', 'challenges.title', 'challenges.description', 'challenges.filename', 'challenges.category', 'challenges.views', 'challenges.upvotes', 'challenges.parent_id', 'users.firstname', 'users.lastname', 'users.email', 'users.username', 'challenges.created_at', 'challenges.user_id').where('challenges.parent_id', '=', parent_id).then(data => {
        res.json(data);
      });
    });
  },

  getUserChallenges: (req, res) => {
    let id = req.query.user_id;
    console.log('HELLO!!', id);
    db.select().from('challenges').where({user_id: id}).innerJoin('users', 'challenges.user_id', 'users.scott').select('challenges.id', 'challenges.title', 'challenges.description', 'challenges.filename', 'challenges.category', 'challenges.views', 'challenges.upvotes', 'challenges.parent_id', 'users.firstname', 'users.lastname', 'users.email', 'users.username', 'challenges.created_at', 'challenges.user_id').where({parent_id: null}).then(data => {
      res.json(data);
    });
  },

  upvote: (req, res) => { //CHECK: Should fix upvote spam but needs to be tested
    let vote = req.body; //req.body should have challenge_id and vote = 1
    console.log('THIS IS THE VOTE', vote);
    db.select().from('users').where({username: req.session.displayName}).then(userData => {
      console.log('THIS IS THE USERDATA', userData);
      db.select().from('votes').where({user_id: userData[0].scott}).andWhere({challenge_id: req.body.challenge_id}).then(exists => {
        if (exists.length) {
          res.sendStatus(404);
        } else {
          vote.user_id = userData[0].scott;
          db.select('user_id').from('challenges').where({id: req.body.challenge_id}).then(data => {
            db.select().from('users').where({scott: data[0].user_id}).increment('upvotes', 1).then(data => {
              db('votes').insert(vote).then( () => {
                db.select().from('votes').where({challenge_id: req.body.challenge_id}).then((voteData) => {
                  console.log('this is vote data', voteData);
                  db.from('challenges').where({id: req.body.challenge_id}).update({upvotes: voteData.length}).then(() => {
                    res.sendStatus(201);
                  });
                });
              });
            });
          });
        }
      });
    });
  },

  favorite: (req, res) => {
    let favorite = req.body;
    db.select().from('users').where({username: req.session.displayName})
      .then(userData => {
        db.select().from('favorites').where({user_id: userData[0].scott}).andWhere({challenge_id: favorite.challenge_id})
          .then( exists => {
            if (exists.length) {
              res.sendStatus(201);
            } else {
              favorite.user_id = userData[0].scott;
              db('favorites').insert(favorite).then(results=>{
                res.sendStatus(201);
              });
            }
          });
      });
  },

  unFavorite: (req, res) => {
    let favorite = req.body.challenge_id;
    db.del().from('favorites').where({challenge_id: favorite})
      .then(() => {
        res.sendStatus(201);
      });
  },

  getFavorites: (req, res) => {
    db.select('scott').from('users').where({username: req.session.displayName})
      .then( userData => {
        db.select('challenge_id').from('favorites').where({user_id: userData[0].scott})
          .then(favorites =>
            res.json(favorites.map(favorite => {
              return parseInt(favorite.challenge_id);
            }))
          );
      });
  },

  viewed: (req, res) => {
    db.select('views').from('challenges').where({id: req.body.challenge_id}).then(challengeData => {
      db.select().from('challenges').where({id: req.body.challenge_id}).update({views: challengeData[0].views + 1}).then( () => {
      });
    });
  },

  challengeSearch: (req, res) => {
    let search = req.query.search;
    db.select().from('challenges').where('title', 'like', `%${search}%`).innerJoin('users', 'challenges.user_id', 'users.id').select('challenges.id', 'challenges.title', 'challenges.description', 'challenges.filename', 'challenges.category', 'challenges.views', 'challenges.upvotes', 'challenges.parent_id', 'users.firstname', 'users.lastname', 'users.email', 'users.username', 'challenges.created_at', 'challenges.user_id').then(data => {
      res.json(data);
    });
  }
};
