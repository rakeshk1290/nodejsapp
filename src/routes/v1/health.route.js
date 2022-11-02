const express = require('express')

const router = express.Router()

const health = (req, res) => {
  res.send('Node works')
}

router.get('/health', health)
module.exports = router
/**
 * @swagger
 * tags:
 *   name: Health
 *   description: Check node health
 */

/**
 * @swagger
 * /check/health:
 *   get:
 *     summary: Get node health
 *     tags: [Health]
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             description: "Node works"
 */
