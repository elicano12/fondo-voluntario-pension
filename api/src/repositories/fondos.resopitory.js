const { FondoModel } = require("../models/fondos.models");

const getFondoPensiones = () => {
  const fondosPensiones = FondoModel.find();
  return fondosPensiones;
};

const postFondoPensiones = async (req, res) => {
  const fondoPensiones = new FondoModel({
    nombre: req.body.nombre,
    montoMinimo: req.body.montoMinimo,
    categoria: req.body.categoria,
  });
  await fondoPensiones.save();
  res.status(201).json(fondoPensiones);
};

module.exports = {
  getFondoPensiones,
  postFondoPensiones,
};
