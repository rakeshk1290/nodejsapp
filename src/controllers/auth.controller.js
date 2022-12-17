const httpStatus = require('http-status')

const logger = require('../config/logger')

const User = require('../models').users

const ApiError = require('../utils/ApiError')

const register = async (req, res, next) => {
  try {
    const result = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      salt: ''
    })
    res.status(httpStatus.CREATED).json(result)
  } catch (e) {
    logger.info(e)
    next(new ApiError(httpStatus.BAD_REQUEST, e.errors[0].message))
  }
}

const login = async (req, res, next) =>{
    
}
module.exports = {
  register,
  login
}
