const express = require("express")
const router= express.Router()
const {getProjects, userSingleProject} = require("../controllers/projectsController")

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: API endpoints for managing projects
 */

/**
 * @swagger
 * /projects/:
 *   get:
 *     summary: Get all projects
 *     description: Retrieve all projects.
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: Projects retrieved successfully.
 */

router.get("/", getProjects);

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Get a single project
 *     description: Retrieve a single project by ID.
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the project to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project retrieved successfully.
 *       404:
 *         description: Project not found.
 */

router.get("/:id", userSingleProject);

module.exports = router;


module.exports=router