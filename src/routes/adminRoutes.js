const express = require("express")
const router = express.Router()
const {homePage, getUsers, getUser, deleteUser, createBlog, deleteBlog, getBlogs, getOneBlog, updateBlog}= require("../controllers/adminController")
const {createProjects,updateProject, deleteProject , adminProjects, adminSingleProject} = require("../controllers/projectsController")
const { getAllMessages, getUnreadMessages, deleteMessage, getSingleMessage, replyMessage, sendMailsToUsers } = require("../controllers/messageController")
/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: API endpoints for admin activities
 * securityDefinitions:
 *   bearerAuth:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 *     description: Use the format "Bearer {token}"
 */

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve all users.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []  # Require the "bearerAuth" token for this endpoint
 *     responses:
 *       200:
 *         description: Users retrieved successfully.
 */
router.get("/users", getUsers);

/**
 * @swagger
 * /admin/user/{id}:
 *   get:
 *     summary: Get a single user
 *     description: Retrieve a single user by ID.
 *     tags: [Users, Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []  # Require the "bearerAuth" token for this endpoint
 *     responses:
 *       200:
 *         description: User retrieved successfully.
 *       401:
 *         description: User not found.
 */

router.get("/user/:id", getUser);

/**
 * @swagger
 * /admin/user/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Delete a user by ID.
 *     tags: [Users, Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User deleted successfully.
 *       401:
 *         description: User not found.
 */

router.delete("/user/:id", deleteUser);

/**
 * @swagger
 * /admin/blogs:
 *   get:
 *     summary: Get all blogs
 *     description: Retrieve all blogs.
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Blogs retrieved successfully.
 */

router.get("/blogs", getBlogs);

/**
 * @swagger
 * /admin/blog/{id}:
 *   get:
 *     summary: Get a single blog
 *     description: Retrieve a single blog by ID.
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the blog to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog retrieved successfully.
 *       404:
 *         description: Blog not found.
 */

router.get("/blog/:id", getOneBlog);

/**
 * @swagger
 * /admin/blog/{id}:
 *   patch:
 *     summary: Update a blog
 *     description: Update a blog by ID.
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the blog to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               summary:
 *                 type: string
 *               isPublished:
 *                 type: boolean
 *               image:
 *                 type: string
 *               allowComments:
 *                 type: boolean
 *             required:
 *               - title
 *               - content
 *               - summary
 *               - isPublished
 *               - image
 *               - allowComments
 *     responses:
 *       201:
 *         description: Blog updated successfully.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Blog not found.
 */

router.patch("/blog/:id", updateBlog);

/**
 * @swagger
 * /admin/blogs:
 *   post:
 *     summary: Create a new blog
 *     description: Create a new blog.
 *     tags: [Admin]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               summary:
 *                 type: string
 *               isPublished:
 *                 type: boolean
 *               image:
 *                 type: string
 *               allowComments:
 *                 type: boolean
 *             required:
 *               - title
 *               - content
 *               - summary
 *               - isPublished
 *               - image
 *               - allowComments
 *     responses:
 *       201:
 *         description: Blog created successfully.
 *       400:
 *         description: Bad request.
 */

router.post("/blogs", createBlog);

/**
 * @swagger
 * /admin/blog/{id}:
 *   delete:
 *     summary: Delete a blog
 *     description: Delete a blog by ID.
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the blog to delete.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Blog deleted successfully.
 *       401:
 *         description: Blog not found.
 */

router.delete("/blog/:id", deleteBlog);

module.exports = router;


// Projects
router.get("/projects", adminProjects)
router.get("/projects/:id", adminSingleProject)
router.post("/projects", createProjects)
router.delete("/projects/:id", deleteProject )
router.patch('/projects/:id', updateProject)

// messages
router.get("/messages", getAllMessages)
router.get("/messages/unread", getUnreadMessages)
router.get("/messages/:id", getSingleMessage)
router.delete("/messages/:id", deleteMessage)
router.post("/messages/:id", replyMessage)
router.post('/email', sendMailsToUsers)
module.exports=router