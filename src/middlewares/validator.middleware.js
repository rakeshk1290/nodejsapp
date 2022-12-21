const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const Validators = require('../validators')

const middleware = (validator, params = false) => {
  if (!Object.prototype.hasOwnProperty.call(Validators, validator)) throw new Error(`'${validator}' validator is not exist`)
  return async (req, res, next) => {
    try {
      const validated = await Validators[validator].validateAsync(params ? req.params : req.body)
      req.body = validated
      next()
    } catch (e) {
      if (e.isJoi) return next(new ApiError(httpStatus.UNPROCESSABLE_ENTITY, e))
      next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Unable to process request'))
    }
  }
}
module.exports = middleware
