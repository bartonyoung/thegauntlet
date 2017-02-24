const comments = require('../models/comments.js');
const db = require('../index.js');

module.exports = {
  addOne: (req, res) => {
    let comment = req.body;
    console.log('req.session.displayName', req.session.displayName);
    db.select('scott').from('users').where({username: req.session.displayName}).then(userData => {
      comment.user_id = userData[0].scott;
      db('comments').insert(comment).then(() => {
        db.select().from('comments').then(data => {
          console.log('comment addOne data', data)
          res.json(data.slice(data.length - 1));
        });
      });
    });
  },

  getAll: (req, res) => {
    if (req.query.challenge_id) {
      console.log("getALl comments from challenge component")
      db.select('comments.comment', 'comments.username', 'comments.created_at', 'comments.challenge_id')
      .from('comments')
      .innerJoin('challenges', 'challenges.id', 'comments.challenge_id').where('comments.challenge_id', '=', req.query.challenge_id).then(data => {
        res.json(data);
      });
    } else {
      console.log('getAll comments from profile component')
      db.select('comments.comment', 'comments.username', 'comments.created_at', 'comments.user_id', 'comments.challenge_id', 'comments.title')
      .from('comments').innerJoin('challenges', 'challenges.id', 'comments.challenge_id').innerJoin('users', 'users.scott', 'challenges.user_id').where('users.scott', '=', req.query.user_id)
      .then((data) => {
        console.log("get all comments", data)
        res.json(data);
      });
    }
  }
};
