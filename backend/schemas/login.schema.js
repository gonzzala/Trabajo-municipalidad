const Joi = require('joi');

const loginSchema = Joi.object({
  mail: Joi.string().min(3).max(100).email().required(),
  contraseña: Joi.string().min(6).max(50).required()
});

module.exports = loginSchema;
