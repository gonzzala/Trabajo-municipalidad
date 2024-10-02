const Joi = require('joi');

const adminSchema = Joi.object({
  idarea: Joi.number().integer().required().messages({
    'any.required': 'El campo Area es obligatorio.'
  }),
  nivel: Joi.number().integer().required().messages({
    'any.required': 'El campo Nivel es obligatorio.'
  }),
  nombre: Joi.string().min(2).max(50).required().messages({
    'any.required': 'El campo Nombre es obligatorio.',
    'string.min': 'El campo Nombre debe tener al menos 2 caracteres.',
    'string.max': 'El campo Nombre no debe tener más de 2 caracteres.',
  }),
  mail: Joi.string().email().required().messages({
    'any.required': 'El campo Mail es obligatorio.',
    'string.email': 'El campo Mail debe ser una dirección de correo electrónico válida.',
  }),
  contraseña: Joi.string().min(6).required().messages({
    'any.required': 'El campo Contraseña es obligatorio.',
    'string.min': 'El campo Contraseña debe tener al menos 6 caracteres.',
  }),
});

module.exports = adminSchema;

