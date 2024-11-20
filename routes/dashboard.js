// google auth
const express = require('express');
const routes = express.Router();
const { ensureAuth } = require('../middleware/auth');
const CreationGoal = require('../models/CreationGoal');
const dashboard = require('../controllers/dashboard.js');

// google auth or github
//  @desc   Dashboard
//  @route  GET /dashboard
routes.get('/', ensureAuth, dashboard.getAllUsersCreationGoals);

module.exports = routes;