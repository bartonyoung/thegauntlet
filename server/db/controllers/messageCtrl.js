const comments = require('../models/messages.js');
const db = require('../index.js');

module.exports = {
  sendOne: (req, res) => {
    let message = req.body;

    db('messages').insert(message).then(() => {
      db.select().from('messages').then(message => {
        res.json(message.slice(message.length - 1));
      });
    });
  },

  getAll: (req, res) => {

  }
  // addOne: (req, res) => {
  //   let comment = req.body;
  //   db.select('scott').from('users').where({username: req.session.displayName}).then(userData => {
  //     comment.user_id = userData[0].scott;
  //     db('comments').insert(comment).then(() => {
  //       db.select().from('comments').then(data => {
  //         res.json(data.slice(data.length - 1));
  //       });
  //     });
  //   });
  // },

  // getAll: (req, res) => {
  //   if (req.query.challenge_id) {
  //     db.select('comments.comment', 'comments.username', 'comments.created_at', 'comments.challenge_id')
  //     .from('comments')
  //     .innerJoin('challenges', 'challenges.id', 'comments.challenge_id').where('comments.challenge_id', '=', req.query.challenge_id).then(data => {
  //       res.json(data);
  //     });
  //   } else {
  //     db.select('comments.comment', 'comments.username', 'comments.created_at', 'comments.user_id', 'comments.challenge_id', 'comments.title')
  //     .from('comments').innerJoin('challenges', 'challenges.id', 'comments.challenge_id').innerJoin('users', 'users.scott', 'challenges.user_id').where('users.scott', '=', req.query.user_id)
  //     .then((data) => {
  //       res.json(data);
  //     });
  //   }
  // }
};