const comments = require('../models/comments.js');
const db = require('../index.js');

module.exports = {
  addOne: (req, res) => {
    let comment = req.body; //NOTE: req.body contains comment & that challenge's primary id
    db.select('id').from('users').where({username: req.session.displayName}).then(userData => {
      comment.user_id = userData[0].id;
      db('comments').insert(comment).then(() => {
        db.select().from('comments').then(data => {
          res.json(data.slice(data.length - 1));
        })
      });
    });
  },

  getAll: (req, res) => {
    db.select('comments.comment', 'users.username', 'challenges.id').from('challenges')
    .innerJoin('comments', 'challenges.id', 'comments.challenge_id')
    .where('challenges.id', '=', req.query.challenge_id)
    .innerJoin('users', 'users.id', 'comments.user_id')
    .then( (data) => {
      res.json(data);
    });
  }
};
