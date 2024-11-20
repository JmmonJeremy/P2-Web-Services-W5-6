const swaggerAutogen = require('swagger-autogen')();

// Check if NODE_ENV is correctly set
console.log('Environment:', process.env.NODE_ENV);

// Check the environment and set the host and scheme accordingly
const isProduction = process.env.NODE_ENV === 'production';
console.log('Is Production:', isProduction); // Check if it's true or false

const doc = {
  info: {
    title: 'creationGoal-api',
    description: 'CreationGoal Process App Personal Project'
  },
  host: isProduction
    ? 'p2-web-services-w5-6.onrender.com'
    : 'localhost:3000',
  schemes: isProduction ? ['https'] : ['http'],
//   components: {
//     securitySchemes: {
//       AuthorizationHeader: {
//         type: 'http',
//         scheme: 'bearer',
//         bearerFormat: 'JWT',
//         description: 'Bearer token for API access.',
//       },
//       CookieHeader: {
//         type: 'apiKey',
//         in: 'cookie',
//         name: 'sessionId',
//         description: 'Session cookie for authentication.',
//       },
//     },
//   },
//   security: [
//     { AuthorizationHeader: [] },
//     { CookieHeader: [] },
//   ],
//   components: {
//     securitySchemes:{
//         bearerAuth: {
//             type: 'http',
//             scheme: 'bearer'
//         }
//     }
// }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js', 'index.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

// USE #1 OR #2 NOT BOTH!!!
// #1 Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger file generated successfully:', outputFile);
}).catch((err) => {
  console.error('Error generating swagger file:', err);
});

// #2 Run server file after it gets generated (like running npm start with it)
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//   await import('./index.js');
// })