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
  await fundPensions.save()
  return fundPensions;
};

module.exports = {
  getFundPensions,
  getFundPensionsById,
  postFundPensions,
};
