const { fondosServices } = require("../services");

const getFondosPensiones = async (req, res, next) => {
  try {
    const fondoPensiones = await fondosServices.getFondosPensiones();
    return res.json(fondoPensiones);
  } catch (err) {
    next(err);
  }
};

const getFondosPensionesById = async (req, res, next) => {
  try {
    const fondos = await fondosServices.getFondosPensionesById(req.params.id);
    return res.json(fondos);
  } catch (err) {
    next(err);
  }
};

const postFondosPensiones = async (req, res, next) => {
  try {
    const { nombre, montoMinimo, categoria } = req.body
    const fondoSave = await fondosServices.postFondosPensiones(nombre, montoMinimo, categoria);
    res.status(201).json(fondoSave);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getFondosPensiones,
  getFondosPensionesById,
  postFondosPensiones,
};
