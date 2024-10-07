const { fundServices } = require("../services");

const getFundPensions = async (req, res, next) => {
  try {
    const fondoPensions = await fundServices.getFundPensions();
    return res.json(fondoPensions);
  } catch (err) {
    next(err);
  }
};

const getFundPensionsById = async (req, res, next) => {
  try {
    const fondos = await fundServices.getFundPensionsById(req.params.id);
    return res.json(fondos);
  } catch (err) {
    next(err);
  }
};

const postFundPensions = async (req, res, next) => {
  try {
    const { nombre, montoMinimo, categoria } = req.body
    const fondoSave = await fundServices.postFundPensions(nombre, montoMinimo, categoria);
    res.status(201).json(fondoSave);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getFundPensions,
  getFundPensionsById,
  postFundPensions,
};
