const chat = require('../models/chats.js');
const db = require('../index.js');

module.exports = {
  createChat: (req, res) => {
    console.log('chat req.body', req.body)
    let chat = req.body;
    let fromUsername = req.body.username;
    db('chats').insert(chat).then(() => {
      db.select().from('chats').then(chatRoom => {
        console.log('chat', chatRoom)
        res.json(chatRoom);
      });
    });
  },

  getChats: (req, res) => {
    let fromUsername = req.query.fromUsername;
    console.log('fromUsername', fromUsername)
    db.select().from('chats').where({fromUsername: fromUsername}).then(data => {
      console.log('chatrooms', data);
    });
  },

  sendOne: (req, res) => {
    let message = req.body;
    let toUser_id = req.params.toUser_id;
    console.log(toUser_id, 'toUser_id');
    db('messages').where({toUser_id: toUser_id}).insert(message).then(() => {
      db.select().from('messages').where({toUser_id: toUser_id}).then(message => {
        res.json(message);
      });
    });
  },

  replyOne: (req, res) => {
    let parent_id = req.body.parent_id;
    let message = req.body;
    console.log("reply one", message, parent_id)
    db('messages').where({parent_id: parent_id}).insert(message).then(() => {
      db.select().from('messages').where({parent_id: parent_id}).then(message => {
        console.log('reply message', message)
      });
    });
  },

  getAll: (req, res) => {
    let toUser_id = req.params.toUser_id;
    db.select('messages.message_id', 'messages.message', 'messages.fromUser_id', 'messages.toUser_id', 'users.username', 'messages.created_at', 'users.profilepic', 'messages.read').from('messages').where({toUser_id: toUser_id}).innerJoin('users', 'users.scott', 'messages.fromUser_id').then(messages => {
      res.json(messages);
    });
  },

  read: (req, res) => {
    let message_id = req.params.id;
    console.log('message id', message_id)
    db.from('messages').where({read: 0}).update({read: 1}).then(() => {
      db.select('messages.message_id', 'messages.message', 'messages.fromUser_id', 'messages.toUser_id', 'users.username', 'messages.created_at', 'users.profilepic', 'messages.read').from('messages').where({message_id: message_id}).innerJoin('users', 'users.scott', 'messages.fromUser_id').then(messages => {
        console.log('messages updated', messages);
        res.json(messages);
      });
    });
  }
};