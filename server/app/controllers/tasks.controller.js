const db = require("../models");
const users = db.users;
const tasks = db.tasks;
const { getTasks } = require("../services/tasks.service");
const { setRedisAsync, delRedisAsync, getRedisAsync } = require("../config/redis.config");

// Retrieve all tasks.
exports.findAll = async (req, res) => {
  const { limit, offset, sort, order } = req.query;
  const transactions = await getTasks(limit, offset, sort, order );
  return res.json(transactions);
};

// remove task by id
exports.removeTask = async (req, res) => {
  const taskId = req.params.id;
  try {
    await tasks.destroy({
      where:{taskId}
    });

    await delRedisAsync(taskId);

    res.send("Ok");
  } catch (error) {
    res.status(500).send({
      message: "Error deleting task with taskId=" + taskId,
    });
  }
};

// get task by id
exports.getTask = async (req, res) => {
  const taskId = req.params.id;
  try {
    let task = await getRedisAsync(taskId);
    if(task==null){
      task = await tasks.findByPk(taskId);
    }
    res.send(task);
  } catch (error) {
    res.status(500).send({
      message: "Error getting task with taskId=" + taskId,
    });
  }
};

exports.addTask = async (req, res) => {
  try {
    const task = await addNewTask(req.body);
    await setRedisAsync(task.taskId, JSON.stringify(task));
    res.send(task);
    
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the task.",
    });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await editTask(req.body, taskId);
    await setRedisAsync(task.taskId, JSON.stringify(task));
    res.send(task);
    
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the task.",
    });
  }
};


const addNewTask = async (taskData)=>{
  return await tasks.create(taskData);
}

const editTask = async (taskData, taskId)=>{
  const task = await tasks.findByPk(taskId);
  for (const [key, value] of Object.entries(taskData)) {
    task[key] = value;
  }
  return await task.save();
}