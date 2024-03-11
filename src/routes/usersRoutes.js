const express = require('express');
const { registerUser, loginUser } = require('../controllers/usersControllers');
const router = express.Router();
const { authenticateToken } = require('../auth/jwebUser');

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoints for Blog Posts
 */

/**
 * @swagger
 * /auth:
 *   get:
 *     summary: Get user dashboard
 *     description: Get the user dashboard.
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: User dashboard retrieved successfully.
 *   post:
 *     summary: Create a new user
 *     description: Register a new user.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully.
 *       400:
 *         description: Bad request.

 */
router.get('/', (req, res) => {
    return res.status(200).json({
        message: 'Welcome to user dashboard!',
    });
});

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user.
 *     tags: [Authentication]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully.
 *       400:
 *         description: Bad request.
 */
router.post('/register', registerUser);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     description: Log in an existing user.
 *     tags: [Authentication]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *       401:
 *         description: Unauthorized.
 */
router.post('/login', loginUser);

module.exports = router;
