const Joi = require("joi");

const fondoIdSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
};

const crearFondosSchema = {
  body: Joi.object({
    nombre: Joi.string().required(),
    categoria: Joi.string(),
    montoMinimo: Joi.number().min(50000).required(),
  }),
};

module.exports = {
  crearFondosSchema,
  fondoIdSchema,
};
