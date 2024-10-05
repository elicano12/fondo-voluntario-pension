const { fondosRepository } = require("../repositories/");
const NotFoundError = require("../utils/errorHandler.js");

const getFondosPensiones = async () => {
  const allFondosPensiones = await fondosRepository.getFondoPensiones();

  if (allFondosPensiones.length === 0) {
    throw new NotFoundError('Fondo Pensiones not found');
  }

  return allFondosPensiones;
};

module.exports = { getFondosPensiones };
