const express = require('express');

const router = express.Router();


const health = ((req, res)=>{
    res.send("Node works")
});

router.get('/health', health);
module.exports = router;
/**
 * @swagger
 * tags
 *  name: Health
 *  description: Check node health
 */

/**
 * @swagger
 * /check/health
 *  get:
 *      summary: check health
 *      tags: [Health]
 *      responses:
 *          "200": 
 *              description: returns node health status
 */