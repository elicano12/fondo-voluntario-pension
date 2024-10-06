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
    const fondos = await fondosServices.getFondosPensionesById(req.query.id);
    return res.json(fondos);
  } catch (err) {
    next(err);
  }
};

const postFondosPensiones = async (req, res, next) => {
  try {
    await fondosServices.postFondosPensiones(req, res);
    res.status(201);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getFondosPensiones,
  getFondosPensionesById,
  postFondosPensiones,
};
