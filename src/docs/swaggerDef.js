const { version } = require('../../package.json')

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'node-express API documentation',
    version
  },
  servers: [
    {
      url: `${process.env.SWAGGER_URL}`
    }
  ]
}

module.exports = swaggerDef
