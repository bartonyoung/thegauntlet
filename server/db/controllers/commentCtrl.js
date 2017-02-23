const comments = require('../models/comments.js');
const db = require('../index.js');

module.exports = {
  addOne: (req, res) => {
    let comment = req.body;
    console.log('req.session.displayName', req.session.displayName);
    db.select('id').from('users').where({username: req.session.displayName}).then(userData => {
      comment.user_id = userData[0].id;
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
      db.select('comments.comment', 'users.username', 'challenges.id', 'comments.created_at').from('challenges')
      .innerJoin('comments', 'challenges.id', 'comments.challenge_id')
      .where('challenges.id', '=', req.query.challenge_id)
      .innerJoin('users', 'users.id', 'comments.user_id')
      .then( (data) => {
        console.log('comment get all', data)
        res.json(data);
      });
    } else {
      console.log('req.query.user_id', req.query.user_id)
      db.select('comments.comment', 'users.username', 'challenges.user_id', 'comments.created_at').from('challenges')
      .innerJoin('comments', 'challenges.id', 'comments.challenge_id')
      .where('challenges.user_id', '=', req.query.user_id)
      .innerJoin('users', 'users.id', 'comments.user_id')
      .then( (data) => {
        console.log('comment get all', data)
        res.json(data);
      });
    }
  }
};
