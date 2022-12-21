const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')

const passport = require('passport')

const User = require('../models').users
// JWT strategy
const options = {
  jwtFromRequest: ExtractJwt.fromHeader('x-auth-token'),
  secretOrKey: process.env.JWT_SECRET
}
const jwtLogin = new JwtStrategy(options, async (payload, done) => {
  try {
    const user = await User.findByPk(payload.id)
    if (user) {
      done(null, user)
    } else {
      done(null, false)
    }
  } catch (err) {
    done(err, false)
  }
})

passport.use(jwtLogin)
