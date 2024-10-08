const { TransactionModel } = require("../models/transaction.models");
const { Types } = require("mongoose");

const getTransactions = () => {
  const transaction = TransactionModel.find();
  return transaction;
};

const getTransactionUserId = async (id, tipo) => {
  const transactions = TransactionModel.find({ usuarioId: id, tipo: tipo });
  return transactions;
};

const saveTransaction = async (transactions) => {
  const transaction = new TransactionModel({
    ...transactions,
    unicoId: new Types.ObjectId().toString(),
  });
  return await transaction.save();
};

const updateTransactions = async (transactions) => {
  const updatedTransaction = await TransactionModel.findByIdAndUpdate(
    { _id: transactions._id },
    { $set: { tipo: transactions.tipo } },
    { new: true }
  );
  return updatedTransaction;
};

const getCancelTransaction = async (usuarioId, fondoId) => {
  const transaction = await TransactionModel.findOne({
    usuarioId: usuarioId,
    fondoId: fondoId,
    tipo: "apertura",
  });
  return transaction;
};

module.exports = {
  getTransactions,
  getTransactionUserId,
  saveTransaction,
  updateTransactions,
  getCancelTransaction,
};
