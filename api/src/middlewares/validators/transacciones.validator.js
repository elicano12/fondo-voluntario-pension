const Joi = require("joi");

const usuarioIdSchema = {
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

const cancelacionSchema = {
    body: Joi.object({
        usuarioId: Joi.string().required(),
        fondoId: Joi.string().required(),
    }),
  };
  
module.exports = {
  subscriptionSchema,
  cancelacionSchema,
  usuarioIdSchema,
};
