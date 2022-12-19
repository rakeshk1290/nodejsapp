const express = require('express')

const router = express.Router()

const authController = require('../../controllers/auth.controller')
const Validator = require('../../middlewares/validator.middleware')

router.post('/register', Validator('register'), authController.register)
router.post('/login', Validator('login'), authController.login)

module.exports = router
