const { FundModel } = require("../models/fund.models");

const getFundPensions = () => {
  const fundPensions = FundModel.find();
  return fundPensions;
};

const getFundPensionsById = (id) => {
  const fundPensions = FundModel.findById(id);
  return fundPensions;
};

const postFundPensions = async ( nombre, montoMinimo, categoria ) => {
  const fundPensions = new FundModel({
    nombre: nombre,
    montoMinimo: montoMinimo,
    categoria: categoria,
  });
  return await fundPensions.save();
};

module.exports = {
  getFundPensions,
  getFundPensionsById,
  postFundPensions,
};
