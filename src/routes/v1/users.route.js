const express = require('express')

const router = express.Router()

const userController = require('../../controllers/user.controller')
const Validator = require('../../middlewares/validator.middleware')
const jwtAuth = require('../../middlewares/jwt.middleware')

router.get('/:id', Validator('userID', true), jwtAuth, userController.getUserByID)
router.delete('/:id', Validator('userID', true), jwtAuth, userController.deleteByID)
router.patch('/:id', Validator('userID', true), jwtAuth, userController.updateByID)

module.exports = router

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Manager users
 */
/**
 * @swagger
 * /v1/user/:id:
 *   get:
 *     summary: Get User By ID
 *     tags: [User]
 *     description: Get User By ID
 *     operationId: getUserById
 *     parameters:
 *       - name: x-auth-token
 *         in: header
 *         schema:
 *           type: string
 *           example: '{{jwt}}'
 *     responses:
 *       '200':
 *         description: ''
 */

/**
 * @swagger
 * /v1/user/:id:
 *    patch:
 *      summary: Update User
 *      tags: [User]
 *      description: Update User
 *      operationId: updateUser
 *      parameters:
 *        - name: x-auth-token
 *          in: header
 *          schema:
 *            type: string
 *            example: '{{jwt}}'
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                password:
 *                  type: string
 *                  example: nike
 *            example:
 *              password: nike
 *      responses:
 *        '200':
 *          description: ''
 */

/**
 * @swagger
 * /v1/user/:id:
 *   delete:
 *     summary: Delete User by ID
 *     tags: [User]
 *     description: Delete User by ID
 *     operationId: deleteUserById
 *     parameters:
 *       - name: x-auth-token
 *         in: header
 *         schema:
 *           type: string
 *           example: '{{jwt}}'
 *     responses:
 *       '200':
 *         description: ''
 */
