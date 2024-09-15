const { getBatchRedisAsync } = require("../config/redis.config");
const db = require("../models");
const tasks = db.tasks;



exports.getTasks = async (userId, limit = 0, offset = 10, sort="createdAt", order="DESC" ) => {
  const taskCount  = await tasks.count({
     where: { userUserId: userId },
  })
  const taskList = await tasks.findAll({
    where: { userUserId: userId },
    attributes: ['taskId'],
    order: [[sort, order]],
    offset,
    limit,
  });
  const listids = taskList.map((task) => {
    return task.dataValues['taskId'];
  });

  let tasklist = await getBatchRedisAsync(listids);
  const list = tasklist.map(task=>JSON.parse(task))
  return {list, totalCount: taskCount};
};
