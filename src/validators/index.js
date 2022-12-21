const register = require('./register.validator')
const login = require('./login.validator')
const userID = require('./user.id.validator')

module.exports = {
  register,
  login,
  userID,
}
