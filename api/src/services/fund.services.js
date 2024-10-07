const { fundRepository } = require("../repositories/index.js");
const NotFoundError = require("../utils/errorHandler.js");

const getFundPensions = async () => {
  const allFundPensions = await fundRepository.getFundPensions();

  if (allFundPensions.length === 0) {
    throw new NotFoundError("Fund Pensions not found");
  }

  return allFundPensions;
};

const getFundPensionsById = async (id) => {
  const fund = await fundRepository.getFundPensionsById(id);
  if (fund == null) {
    throw new NotFoundError("Fund not found");
  }

  return fund;
};

const postFundPensions = async (nombre, montoMinimo, categoria) => {
  if (!nombre || !montoMinimo || !categoria) {
    throw new Error("Missing required fields: nombre, montoMinimo, categoria");
  }

  const fundPensions = await fundRepository.postFundPensions(nombre, montoMinimo, categoria);
  return fundPensions;
};

module.exports = {
  getFundPensions,
  getFundPensionsById,
  postFundPensions,
};
