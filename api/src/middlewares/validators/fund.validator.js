const Joi = require("joi");

const fundIdSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
};

const createfundsSchema = {
  body: Joi.object({
    nombre: Joi.string().required(),
    categoria: Joi.string(),
    montoMinimo: Joi.number().min(50000).required(),
  }),
};

module.exports = {
  createfundsSchema,
  fundIdSchema,
};
