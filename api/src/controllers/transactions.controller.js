const { transactionsServices } = require("../services");

const getTransactions = async (req, res, next) => {
  try {
    const transacciones = await transactionsServices.getTransactions();
    return res.json(transacciones);
  } catch (err) {
    next(err);
  }
};

const getTransactionUserId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const transacciones = await transactionsServices.getTransactionUserId(
      id,
      (tipo = "apertura")
    );
    res.status(201).json(transacciones);
  } catch (err) {
    next(err);
  }
};

const postOpenFund = async (req, res, next) => {
  try {
    const { usuarioId, fondoId, monto, tipo } = req.body;
    const { fund, message } = await transactionsServices.postOpenFund(
      usuarioId,
      fondoId,
      monto,
      tipo
    );
    res.status(201).json({ fondo: fund, message });
  } catch (err) {
    next(err);
  }
};

const postCancelFund = async (req, res, next) => {
  try {
    const { usuarioId, fondoId } = req.body;
    const { fund, message } = await transactionsServices.postCancelFund(
      usuarioId,
      fondoId
    );
    res.status(201).json({ fondo: fund, message });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getTransactions,
  getTransactionUserId,
  postOpenFund,
  postCancelFund,
};
