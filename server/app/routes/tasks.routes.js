const taskController = require("../controllers/tasks.controller");
const schemas = require("../validators/schemas");
const joiSwagger = require("../validators/validator");
const router = joiSwagger.wrapRouter(require("express").Router(), "/api");

router.post(
  "/setup",
  {
    summary: "Sets up intial task-manager",
    description: "Sets up the intial task-manager",
    validate: {
      body: schemas.setUp,
    },
  },
  taskController.setUp
);

// Save a task add:edit
router.post(
  "/task/:userId",
  {
    summary: "save a task",
    description: "save a task to list",
    validate: {
      body: schemas.addTask,
    },
  },
  taskController.saveTask
);

router.delete(
  "/task/:taskId",
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
  "/task/:taskId",
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
  "/transactions",
  {
    summary: "Get all transactions",
    description: "Gets a list of transactions for a task-manager",
    validate: {
      query: schemas.findAllTasks,
    },
  },
  taskController.findAll
);
module.exports = router.expressRouter;
