const Joi = require("joi");

const userIdSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
};

const subscriptionSchema = {
  body: Joi.object({
    usuarioId: Joi.string().required(),
    fondoId: Joi.string().required(),
    tipo: Joi.string().required(),
    monto: Joi.number().min(50000).required(),
  }),
};

const cancelSchema = {
    body: Joi.object({
        usuarioId: Joi.string().required(),
        fondoId: Joi.string().required(),
    }),
  };
  
module.exports = {
  subscriptionSchema,
  cancelSchema,
  userIdSchema,
};
