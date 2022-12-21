const httpStatus = require('http-status')
const jwt = require('jsonwebtoken')

const logger = require('../config/logger')
const User = require('../models').users
const ApiError = require('../utils/ApiError')
const { INVALID_TOKEN } = require('../utils/constants')

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

// const login = async (req, res, next) => {
//   try {
//     const result = await User.findOne({ where: { email: req.body.email } })
//     if (result.validPassword(req.body.password, result.dataValues.password, result.dataValues.salt))
//       res.status(httpStatus.OK).json(result)
//     else res.status(httpStatus.UNAUTHORIZED).json('Invalid')
//   } catch (e) {
//     logger.info(e)
//     next(new ApiError(httpStatus.NOT_FOUND, e))
//   }
// }

const login = (req, res) => {
  const token = jwt.sign(
    {
      expiresIn: '12h',
      ...req.user
    },
    process.env.JWT_SECRET
  )
  const { user } = req
  res.json({ user, token })
}

const profile = (req, res, next) => {
  if (!req.user) {
    return next(new ApiError(httpStatus.UNAUTHORIZED, INVALID_TOKEN))
  }
  return res.status(httpStatus.OK).json(req.user)
}

module.exports = {
  register,
  login,
  profile
}
