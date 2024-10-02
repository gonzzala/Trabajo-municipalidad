const Joi = require('joi');

const recoveryRequestSchema = Joi.object({
  mail: Joi.string().min(3).max(100).email().required(),
});

const resetPasswordSchema = Joi.object({
  newPassword: Joi.string().min(6).max(50).required(),
});

module.exports = {recoveryRequestSchema,resetPasswordSchema};
