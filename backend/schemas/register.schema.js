const Joi = require('joi');

const registerSchema = Joi.object({
    nombre: Joi.string().min(2).max(50).required(),
    apellido: Joi.string().min(2).max(50).required(),
    DNI: Joi.number().integer().min(1000000).max(9999999999).required(),
    idpartido: Joi.number().integer().required(),
    direccion: Joi.string().min(5).max(100).required(),
    mail: Joi.string().email().required(),
    contraseña: Joi.string().min(6).required(),
    enable: Joi.number().integer().valid(0, 1).required()
});

module.exports = registerSchema;
