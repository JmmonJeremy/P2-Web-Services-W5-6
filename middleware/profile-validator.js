const validator = require('../helpers/validation-methods');

// Sources: https://github.com/mikeerickson/validatorjs & https://blog.logrocket.com/handle-data-validation-node-js-validatorjs/
const acceptProfileInput = (req, res, next) => {
  const creationValidationRules = {
    username: 'required|string|alpha_dash|max:20',
    motto: 'required|string',    
    firstName: 'required|string|alpha|max:20',
    middleName: 'string|alpha|max:20',
    lastName: 'required|string|alpha|max:20',
    idol: 'required|string|max:62',
    photo: 'string'
  };
  validator(req.body, creationValidationRules, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const approveUsername = (req, res, next) => {
  const rules = {
    username: 'required|string|alpha_dash|max:20'
  };
  // Apply validation to req.params which holds URL parameters
  validator({ username: req.params.username }, rules, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  acceptProfileInput,
  approveUsername
};