const httpStatus = require('http-status')
const passport = require('passport')
const ApiError = require('../utils/ApiError')

const passportLocalAuth = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(new ApiError(httpStatus.NOT_FOUND, err))
    }
    if (!user) {
      return next(new ApiError(httpStatus.UNPROCESSABLE_ENTITY, info))
    }
    req.user = user
    next()
  })(req, res, next)
}

module.exports = passportLocalAuth
