const routes = require('express').Router();
const users = require('../controllers/user.js');
const validation = require('../middleware/user-validator.js');

routes.get('/', users.findAll);
routes.get('/:id', validation.approveId, users.findOne);
routes.post('/', validation.acceptUserInput, users.create);
routes.put('/:id', validation.approveId, validation.acceptUserInput, users.update);
routes.delete('/:id', validation.approveId, users.delete);

module.exports = routes;