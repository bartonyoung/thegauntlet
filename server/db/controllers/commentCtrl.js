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
          console.log('comment addOne data', data);
          res.json(data.slice(data.length - 1));
        });
      });
    });
  },

  getAll: (req, res) => {
    if (req.query.challenge_id) {
      db.select('comments.comment', 'users.username', 'challenges.id', 'comments.created_at', 'users.scott').from('challenges')
      .innerJoin('comments', 'challenges.id', 'comments.challenge_id')
      .where('challenges.id', '=', req.query.challenge_id)
      .innerJoin('users', 'comments.user_id', 'users.scott')
      .then( (data) => {
        console.log('data', data);
        res.json(data);
      });
    } else {
      db.select('comments.comment', 'users.username', 'challenges.user_id', 'comments.created_at').from('challenges')
      .innerJoin('comments', 'challenges.id', 'comments.challenge_id')
      .innerJoin('users', 'users.scott', 'comments.user_id')
      .where('challenges.user_id', '=', req.query.user_id)
      .then((data) => {
        res.json(data);
      });
    }
  }
};
