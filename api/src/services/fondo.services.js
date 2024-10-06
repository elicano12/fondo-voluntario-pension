const { fondosRepository } = require("../repositories/");
const NotFoundError = require("../utils/errorHandler.js");

const getFondosPensiones = async () => {
  const allFondosPensiones = await fondosRepository.getFondoPensiones();

  if (allFondosPensiones.length === 0) {
    throw new NotFoundError("Fondo Pensiones not found");
  }

  return allFondosPensiones;
};

const getFondosPensionesById = async (id) => {
  const fondo = await fondosRepository.getFondoPensionesById(id);
  if (fondo == null) {
    throw new NotFoundError("fondo no encontrado");
  }

  return fondo;
};

const postFondosPensiones = async (nombre, montoMinimo, categoria) => {
  if (!nombre || !montoMinimo || !categoria) {
    throw new Error("Missing required fields: nombre, montoMinimo, categoria");
  }

  const fondoPensiones = await fondosRepository.postFondoPensiones(nombre, montoMinimo, categoria);
  return fondoPensiones;
};

module.exports = {
  getFondosPensiones,
  getFondosPensionesById,
  postFondosPensiones,
};
