const routes = require('express').Router();
const userControllers = require('../db/controllers/userCtrl.js');
const s3Controller = require('../db/controllers/s3Ctrl.js');
const challengeController = require('../db/controllers/challengeCtrl.js');

routes.post('/signup', userControllers.signup);
routes.post('/login', userControllers.login);
routes.get('/logout', userControllers.logout);
routes.post('/userUpload', s3Controller);
routes.get('/allChallenges', challengeController.getAll);
routes.post('/challenge', challengeController.addOne);
routes.get('/:challengeName', challengeController.getOne);
module.exports = routes;