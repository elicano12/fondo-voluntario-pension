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

const postFondosPensiones = async (req, res) => {
  if (!req.body.nombre || !req.body.montoMinimo || !req.body.categoria) {
    throw new Error("Missing required fields: nombre, montoMinimo, categoria");
  }

  await fondosRepository.postFondoPensiones(req, res);
};

module.exports = {
  getFondosPensiones,
  getFondosPensionesById,
  postFondosPensiones,
};
