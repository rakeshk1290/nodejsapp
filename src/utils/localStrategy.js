const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('../models').users
const { WRONG_PASSWORD, USER_DOES_NOT_EXIST } = require('./constants')

const passportLogin = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true,
  },
  async (req, email, password, done) => {
    try {
      const user = await User.findOne({ where: { email: email.trim() } })
      if (!user) {
        return done(null, false, USER_DOES_NOT_EXIST)
      }

      if (!user.validPassword(password, user.dataValues.password, user.dataValues.salt)) {
        return done(null, false, WRONG_PASSWORD)
      }
      delete user.dataValues.password
      delete user.dataValues.salt
      return done(null, user.dataValues)
    } catch (err) {
      return done(err)
    }
  }
)

passport.use(passportLogin)
