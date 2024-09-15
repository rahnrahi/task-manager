const db = require("../models");
const users = db.users;
const tasks = db.tasks;
const { getTasks } = require("../services/tasks.service");
const { setRedisAsync, delRedisAsync, getRedisAsync } = require("../config/redis.config");

// Create and Save a new Tutorial
exports.setUp = async (req, res) => {
  const { username } = req.body;
  try {
    const user = await users.create({ username });
    res.send({
      id: user.userId,
      name: username,
      date: user.createdAt,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the user.",
    });
  }
};

// Retrieve all tasks.
exports.findAll = async (req, res) => {
  const { userId, limit, offset, sort, order } = req.query;
  const transactions = await getTasks(userId, parseInt(limit), parseInt(offset), sort, order );
  return res.json(transactions);
};

// remove task by id
exports.removeTask = async (req, res) => {
  const taskId = req.params.taskId;
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
  const taskId = req.params.taskId;
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

exports.saveTask = async (req, res) => {
  const userId = req.params.userId;
  try {
    const task = req.body?.taskId===''? await addNewTask(req.body, userId) :  await editTask(req.body);
    await setRedisAsync(task.taskId, JSON.stringify(task));
    res.send(task);
    
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the task.",
    });
  }
};


const addNewTask = async (taskData, userId)=>{
  delete taskData?.taskId;
  return await tasks.create({
    ...taskData,
    userUserId: userId
  });
}

const editTask = async (taskData)=>{
  const task = await tasks.findByPk(taskData?.taskId);
  for (const [key, value] of Object.entries(taskData)) {
    if(key!=='taskId'){
      task[key] = value;
    }
  }
  return await task.save();
}