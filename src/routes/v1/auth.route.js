const express = require('express')

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

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Auth
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login
 *     tags: [Auth]
 *     description: Login
 *     operationId: login
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: rakesh@email.com
 *               password:
 *                 type: string
 *                 example: rakesh
 *           example:
 *             email: rakesh@email.com
 *             password: rakesh
 *     responses:
 *       '200':
 *         description: ''
 */
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register
 *     tags: [Auth]
 *     description: Register
 *     operationId: register
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: ak@email.com
 *               firstName:
 *                 type: string
 *                 example: Rakesh
 *               lastName:
 *                 type: string
 *                 example: K
 *               password:
 *                 type: string
 *                 example: password
 *           example:
 *             email: ak@email.com
 *             firstName: Rakesh
 *             lastName: K
 *             password: password
 *     responses:
 *       '200':
 *         description: ''
 */

/**
 * @swagger
 * /auth/profile:
 *    get:
 *     summary: Get Profile
 *     tags: [Auth]
 *     description: Get User Profile
 *     operationId: getProfile
 *     parameters:
 *       - name: x-auth-token
 *         in: header
 *         schema:
 *           type: string
 *           example: '{{jwt}}'
 *     responses:
 *       '200':
 *         description: 'return user profile'
 */
