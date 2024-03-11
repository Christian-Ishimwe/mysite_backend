const express = require("express")
const router= express.Router()
const {sendMessage} = require("../controllers/messageController")
/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: API endpoints for managing messages
 */

/**
 * @swagger
 * /message/:
 *   post:
 *     summary: Send a message
 *     description: Send a message.
 *     tags: [Messages]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               subject:
 *                 type: string
 *               message:
 *                 type: string
 *               email:
 *                 type: string
 *               telephone:
 *                 type: string
 *             required:
 *               - name
 *               - subject
 *               - message
 *               - email
 *     responses:
 *       201:
 *         description: Message sent successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Internal Server Error.
 */

router.post("/", sendMessage);

module.exports = router;
