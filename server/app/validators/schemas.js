const Joi = require("joi");
const schemas = {
  setUp: Joi.object().keys({
    username: Joi.string().required(),
  }),
  addTask: Joi.object().keys({
    taskId: Joi.string().uuid().allow(''),
    description: Joi.string().required(),
    title: Joi.string().required(),
    priority: Joi.string().required(),
    status: Joi.string().required(),
    deadline: Joi.date().required(),
  }),
  removeTask: Joi.object().keys({
    taskId: Joi.string().uuid().required(),
  }),
  findAllTasks: Joi.object().keys({
    userId: Joi.string().uuid().required(),
    limit: Joi.number().integer().min(10).required(),
    offset: Joi.number().integer().min(0).required(),
  }),
};
module.exports = schemas;
