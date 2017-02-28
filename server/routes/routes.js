const routes = require('express').Router();
const userControllers = require('../db/controllers/userCtrl.js');
const s3Controller = require('../db/controllers/s3Ctrl.js');
const challengeController = require('../db/controllers/challengeCtrl.js');
const commentController = require('../db/controllers/commentCtrl.js');
const followerController = require('../db/controllers/followerCtrl.js');
const messageController = require('../db/controllers/messageCtrl.js');

routes.post('/signup', userControllers.signup);
routes.post('/login', userControllers.login);
routes.get('/logout', userControllers.logout);
routes.get('/isUser', userControllers.isUser);
routes.get('/profile', userControllers.getUser);
routes.put('/profile', userControllers.updateProfile);
routes.get('/profile/:username', userControllers.getUser);
routes.post('/challenge', challengeController.addOne);
routes.get('/singleChallenge', challengeController.getSingleChallengeById);
routes.get('/allChallenges', challengeController.getAll);
routes.get('/everyChallenge', challengeController.getEveryChallenge);
routes.get('/challenge/:id', challengeController.getOne);
routes.put('/challenge/:id', challengeController.updateOne);
routes.delete('/challenge/:id', challengeController.deleteOne);
routes.get('/userChallenges', challengeController.getUserChallenges);
routes.post('/response', challengeController.addOneResponse);
routes.get('/response', challengeController.getAllResponses);
routes.delete('/response/:id', challengeController.deleteOneResponse);
routes.post('/comments', commentController.addOne);
routes.get('/comments', commentController.getAll);
routes.get('/ranks', userControllers.getAllUsers);
routes.post('/upvote', challengeController.upvote);
routes.get('/upvote', challengeController.getUpvoted);
routes.post('/downvote', challengeController.downvotes);
routes.get('/downvote', challengeController.getDownvoted);
routes.post('/viewed', challengeController.viewed);
routes.post('/unFollow', followerController.unFollow);
routes.post('/follower', followerController.follow);
routes.get('/listFollowers', followerController.getListOfFollowers);
routes.get('/getLeaders', followerController.getLeaders);
routes.post('/favorite', challengeController.favorite);
routes.get('/favorite', challengeController.getFavorites);
routes.post('/unFavorite', challengeController.unFavorite);
routes.get('/isUser', userControllers.isUser);
routes.get('/challengeSearch', challengeController.challengeSearch);
routes.post('/userUpload', s3Controller);
routes.post('/s3', challengeController.s3);
routes.post('/messages/:toUser_id', messageController.sendOne);
routes.get('/messages/:toUser_id', messageController.getAll);
routes.put('/messages/:id', messageController.read);
module.exports = routes;