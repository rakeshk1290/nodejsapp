const express = require('express')

const router = express.Router()

const authController = require('../../controllers/auth.controller')
const middleware = require('../../middlewares/validator.middleware')

const userSchema = require('../../validators/user.schema')

router.post('/register', middleware(userSchema), authController.register)


module.exports = router
