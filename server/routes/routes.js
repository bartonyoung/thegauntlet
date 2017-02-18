const routes = require('express').Router();
const userControllers = require('../db/controllers/userCtrl.js');
const s3Controller = require('../db/controllers/s3Ctrl.js');
const challengeController = require('../db/controllers/challengeCtrl.js');
const commentController = require('../db/controllers/commentCtrl.js');
const followerController = require('../db/controllers/followerCtrl.js');

routes.post('/signup', userControllers.signup);
routes.post('/login', userControllers.login);
routes.post('/userUpload', s3Controller);
routes.post('/challenge', challengeController.addOne);
routes.post('/comments', commentController.addOne);
routes.post('/s3', challengeController.s3);
routes.post('/upvote', challengeController.upvote);
routes.post('/viewed', challengeController.viewed);
routes.post('/unFollow', followerController.unFollow);
routes.post('/response', challengeController.addOneResponse);
routes.post('/follower', followerController.follow);
routes.post('/favorite', challengeController.favorite);
routes.post('/unFavorite', challengeController.unFavorite);

routes.get('/logout', userControllers.logout);
routes.get('/allChallenges', challengeController.getAll);
routes.get('/challenge/:id', challengeController.getOne);
routes.get('/comments', commentController.getAll);
routes.get('/response', challengeController.getAllResponses);
routes.get('/profile/:username', userControllers.getUser);
routes.get('/profile', userControllers.getUser);
routes.get('/getLeaders', followerController.getLeaders);
routes.get('/listFollowers', followerController.getListOfFollowers);
routes.get('/ranks', userControllers.getAllUsers);
routes.get('/favorite', challengeController.getFavorites);

routes.put('/response/:id', challengeController.updateOneResponse);
routes.put('/challenge/:id', challengeController.updateOne);

routes.delete('/challenge/:id', challengeController.deleteOne);
routes.delete('/response/:id', challengeController.deleteOneResponse);
module.exports = routes;