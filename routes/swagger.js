const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', (req, res) => {
    /* #swagger.summary = GETS the SWAGGER API DOCUMENTATION page ____________*** This api-docs page is in sync with the ---(OAUTH AUTHORIZATION)--- from the LOGIN entry page***" */
    /* #swagger.description = 'All routes are displayed for the creationGoals app.' */
    // #swagger.responses[200] = { description: 'SUCCESS, GET returned the SWAGGER API DOCUMENTATION page' }
    // #swagger.responses[500] = { description: 'There was an INTERNAL SERVER ERROR while trying to GET the SWAGGER API DOCUMENTATION page'}
  try { 
    // Serve the Swagger UI with swaggerDocument
    swaggerUi.setup(swaggerDocument)(req, res.status(200));
  } catch (error) {
    console.error('Error loading Swagger UI:', error);
    // Respond with a 500 error if something goes wrong
    res.status(500).json({
      message: 'There was an error loading the Swagger documentation.',
      error: error.message,
    });
  }
});


module.exports = router;