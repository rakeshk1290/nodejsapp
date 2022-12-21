const express = require('express')
const helmet = require('helmet')
const xss = require('xss-clean')
const httpStatus = require('http-status')
const passport = require('passport')
const session = require('express-session')
const dotenv = require('dotenv')

dotenv.config()
require('./utils/localStrategy')
require('./utils/jwtStrategy')
const config = require('./config/config')
const morgan = require('./config/morgan')
const routes = require('./routes/v1')
const { errorConverter, errorHandler } = require('./middlewares/error')
const ApiError = require('./utils/ApiError')
const models = require('./models')
const logger = require('./config/logger')

const app = express()

app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

app.use(session({ resave: false, saveUninitialized: true, secret: process.env.SESSION_SECRET }))

app.use(passport.initialize())

app.use(passport.session())

if (config.env !== 'test') {
  app.use(morgan.successHandler)
  app.use(morgan.errorHandler)
}

models.sequelize
  .sync()
  .then(function () {
    logger.info('connected to database')
  })
  .catch(function (err) {
    logger.info(err)
  })

// set security HTTP headers
app.use(helmet())

// parse json request body
app.use(express.json())

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }))

// sanitize request data
app.use(xss())

// v1 api routes
app.use('/v1', routes)

app.get('/', (req, res) => {
  res.redirect('/v1/docs')
})

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'))
})

// convert error to ApiError, if needed
app.use(errorConverter)

// handle error
app.use(errorHandler)

module.exports = app
