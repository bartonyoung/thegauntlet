const challenges = require('../models/challenges.js');
const db = require('../index.js');
const s3 = require('./s3Ctrl.js');

module.exports = {
  addOne: (req, res) => {
    const challenge = req.body;
    console.log(req.body);
    db.select('id').from('users').where({username: 'Scott'}).then(userData => { //TODO:Change to req.session.username
      challenge.user_id = userData[0].id;
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
    const title = req.params;
    console.log(req.params);
    db.select().from('challenges').where({title: req.params.challengeName}).then(data =>{
      res.json(data);
    }).catch(err => {
      if (err) { console.error(err); }
    });
  }
};      