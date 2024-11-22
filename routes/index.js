const routes = require('express').Router();
const profile = require('./profile');
const users = require('./user');
const swagger = require('./swagger');
const static = require('./static');
const register = require('./register');
const auth = require('./auth'); // google auth 
const dashboard = require('./dashboard'); // google auth 
const creationGoals = require('./creationGoals'); // google auth 
const { ensureGuest } = require('../middleware/auth'); // google auth 
const home = require('../controllers/index.js');
const oauth = require('./oauth'); //github oauth
const oauthCallback = require('./oauth-callback'); //github oauth

// google auth BASE/HOME/PAGE
//  @desc   Login/Landing page
//  @route  GET /
routes.get('/', ensureGuest, home.grantAccess);

// routes.use('/', oauth); //github oauth
// routes.use('/', oauthCallback); //github oauth
routes.use('/', static);
routes.use('/', swagger);
routes.use('/profiles', profile);
routes.use('/user', users);
// console.log("Register router loaded:", register);
routes.use('/register', register);
routes.use('/auth', auth);  // google auth - put here instead of in root/index.js
routes.use('/dashboard', dashboard);  // google auth - put here instead of in root/index.js
routes.use('/creationGoals', creationGoals);  // google auth - put here instead of in root/index.js

module.exports = routes;
