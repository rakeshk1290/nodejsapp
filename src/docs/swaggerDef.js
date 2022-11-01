const { version } = require('../../package.json');
const config = require('../config/config');
const routes = require('../routes/v1')
const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'node-express API documentation',
    version
  },
  servers: [
    {
      url: `http://localhost:${config.port}/v1`,
    },
  ]
};

module.exports = swaggerDef;