const dbConfig = require('../config/db.config.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.Profile = require('./profiles.js')(mongoose);
db.User = require('./User.js')(mongoose);
db.goals = require('./CreationGoal.js')(mongoose);

module.exports = db;
