const { FondoModel } = require("../models/fondos.models");

const getFondoPensiones = () => {
  const fondosPensiones = FondoModel.find();
  return fondosPensiones;
};

const getFondoPensionesById = (id) => {
  const fondoPensiones = FondoModel.findById(id);
  return fondoPensiones;
};

const postFondoPensiones = async ( nombre, montoMinimo, categoria ) => {
  const fondoPensiones = new FondoModel({
    nombre: nombre,
    montoMinimo: montoMinimo,
    categoria: categoria,
  });
  await fondoPensiones.save()
  return fondoPensiones;
};

module.exports = {
  getFondoPensiones,
  getFondoPensionesById,
  postFondoPensiones,
};
