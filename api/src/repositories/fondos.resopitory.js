const { FondoModel } = require("../models/fondo.models");

const getFondoPensiones = () => {
  const fondosPensiones = FondoModel.find();
  return fondosPensiones;
};

module.exports = { getFondoPensiones };
