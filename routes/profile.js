const routes = require('express').Router();
const profiles = require('../controllers/profile.js');
const validation = require('../middleware/profile-validator');

/* #swagger.operationId = 'getProfiles' */
routes.get('/', profiles.findAll);
/* #swagger.operationId = 'getProfileByUsername' */
routes.get('/:username', validation.approveUsername, profiles.findOne);
/* #swagger.operationId = 'createProfile' */
routes.post('/', validation.acceptProfileInput, profiles.create);
/* #swagger.operationId = 'updateProfile' */
routes.put('/:username', validation.approveUsername, validation.acceptProfileInput, profiles.update);
/* #swagger.operationId = 'deleteProfile' */
routes.delete('/:username', validation.approveUsername, profiles.delete);

module.exports = routes;
