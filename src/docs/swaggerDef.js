const { version } = require('../../package.json')
const config = require('../config/config')

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'node-express API documentation',
    version
  },
  servers: [
    {
      url: `https://nodejsbadge.herokuapp.com/v1`
    }
  ]
}

module.exports = swaggerDef
