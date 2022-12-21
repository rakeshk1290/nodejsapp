const httpStatus = require('http-status')

const logger = require('../config/logger')
const User = require('../models').users
const ApiError = require('../utils/ApiError')

const getUserByID = async (req, res, next) => {
  try {
    const result = await User.findByPk(req.params.id)
    res.status(httpStatus.CREATED).json(result)
  } catch (e) {
    logger.info(e)
    next(new ApiError(httpStatus.BAD_REQUEST, e.errors[0].message))
  }
}

const deleteByID = async (req, res, next) => {
  try {
    const result = await User.destroy({
      where: {
        id: req.params.id,
      },
    })
    res.status(httpStatus.OK).json({ message: `Delete successful` })
  } catch (e) {
    logger.info(e)
    next(new ApiError(httpStatus.BAD_REQUEST, e.errors[0].message))
  }
}

const updateByID = async (req, res, next) => {
  try {
    const result = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    res.status(httpStatus.OK).json({ message: `Update successful` })
  } catch (e) {
    logger.info(e)
    next(new ApiError(httpStatus.BAD_REQUEST, e.errors[0].message))
  }
}

module.exports = {
  getUserByID,
  deleteByID,
  updateByID,
}
