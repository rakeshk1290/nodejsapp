const express = require('express')
const ensureLogIn = require('connect-ensure-login').ensureLoggedIn

const router = express.Router()

const authController = require('../../controllers/auth.controller')
const Validator = require('../../middlewares/validator.middleware')
const passportLocalAuth = require('../../middlewares/passport.middleware')
const jwtAuth = require('../../middlewares/jwt.middleware')

router.post('/register', Validator('register'), authController.register)

// router.post('/login', Validator('login'), authController.login)

router.post('/login', Validator('login'), passportLocalAuth, authController.login)

router.get('/profile', jwtAuth, authController.profile)

module.exports = router
