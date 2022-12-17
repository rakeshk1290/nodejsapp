const httpStatus = require('http-status')

const middleware = (schema, property) => {
  return (req, res, next) => {
    const { error } = schema.validate({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    })
    const valid = error == null

    if (valid) {
      next()
    } else {
      const { details } = error
      const message = details.map((i) => i.message).join(',')
      res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: message })
    }
  }
}
module.exports = middleware
