const taskController = require("../controllers/tasks.controller");
const schemas = require("../validators/schemas");
const joiSwagger = require("../validators/validator");
const router = joiSwagger.wrapRouter(require("express").Router(), "/api");

// Add a task
router.post(
  "/tasks",
  {
    summary: "Add a task",
    description: "save a task to list",
    validate: {
      body: schemas.addTask,
    },
  },
  taskController.addTask
);

// Update a task 
router.put(
  "/tasks/:id",
  {
    summary: "Update a task",
    description: "Update a task to list",
    validate: {
      body: schemas.addTask,
    },
  },
  taskController.updateTask
);

router.delete(
  "/tasks/:id",
  {
    summary: "Remove a task with id",
    description: "Remove a task with id",
    validate: {
      params: schemas.removeTask,
    },
  },
  taskController.removeTask
);

router.get(
  "/tasks/:id",
  {
    summary: "Get a task with id",
    description: "Get a task with id",
    validate: {
      params: schemas.removeTask,
    },
  },
  taskController.getTask
);

router.get(
  "/tasks",
  {
    summary: "Get all tasks",
    description: "Gets a list of tasks for a task-manager",
    validate: {
      query: schemas.findAllTasks,
    },
  },
  taskController.findAll
);
module.exports = router.expressRouter;
