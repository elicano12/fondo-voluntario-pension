const Joi = require("joi");

const userIdSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
};

const createUserSchema = {
  body: Joi.object({
    nombre: Joi.string().required(),
    email: Joi.string().required(),
    telefono: Joi.number().min(50000).required(),
    saldo: Joi.number().default(500000),
    notificaciones: Joi.string(),
  }),
};

module.exports = {
  createUserSchema,
  userIdSchema,
};
