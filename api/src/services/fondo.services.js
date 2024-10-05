const { fondosRepository } = require("../repositories/");
const NotFoundError = require("../utils/errorHandler.js");

const getFondosPensiones = async () => {
  const allFondosPensiones = await fondosRepository.getFondoPensiones();

  if (allFondosPensiones.length === 0) {
    throw new NotFoundError("Fondo Pensiones not found");
  }

  return allFondosPensiones;
};

const postFondosPensiones = async (req, res) => {
  if (!req.body.nombre || !req.body.montoMinimo || !req.body.categoria) {
    throw new Error("Missing required fields: nombre, montoMinimo, categoria");
  }

  await fondosRepository.postFondoPensiones(req, res);
};

module.exports = {
  getFondosPensiones,
  postFondosPensiones,
};
