const {
  transactionsRepository,
  fundRepository,
  usersRepository,
} = require("../repositories");
const { enviarSMS, enviarEmails } = require("../utils");
const { NotFoundError, BadRequestError } = require("../utils/errors");

const getTransactions = async () => {
  const transactions = await transactionsRepository.getTransactions();

  if (transactions.length === 0) {
    throw new NotFoundError("transactions not found");
  }

  return transactions;
};

const getTransactionUserId = async (id, tipo) => {
  const transacciones = await transactionsRepository.getTransactionUserId(
    id,
    tipo
  );
  return transacciones;
};

const postOpenFund = async (usuarioId, fondoId, monto, tipo) => {
  const users = await usersRepository.getUserById(usuarioId);
  const fund = await fundRepository.getFundPensionsById(fondoId);

  if (users == null || fund == null) {
    throw new NotFoundError("Users o Funds not found");
  }

  if (users.saldo < monto) {
    throw new NotFoundError(
      `No tiene saldo disponible para vincularse al fondo ${fund.nombre}`
    );
  }

  users.saldo -= fund.montoMinimo;

  await usersRepository.saveUser(users);

  const trsnsaction = {
    usuarioId,
    fondoId,
    monto: fund.montoMinimo,
    tipo,
  };

  await transactionsRepository.saveTransaction(trsnsaction);

  if (users.notificaciones === "email") {
    enviarEmails(users.email, `Suscripción exitosa al fondo ${fund.nombre}`);
  } else {
    enviarSMS(users.telefono, `Suscripción exitosa al fondo ${fund.nombre}`);
  }

  return { fund, message: "Suscripción realizada con éxito." };
};

const postCancelFund = async (usuarioId, fondoId) => {
  const fund = await fundRepository.getFundPensionsById(fondoId);
  const users = await usersRepository.getUserById(usuarioId);

  if (fund == null || users == null) {
    throw new NotFoundError("Users o Funds not found");
  }

  const transaction = await transactionsRepository.getCancelTransaction(
    usuarioId,
    fondoId
  );

  if (!transaction) {
    throw new NotFoundError(
      `No se encontró la transacción activa al fondo ${fund.nombre}`
    );
  }

  users.saldo += transaction.monto;

  await usersRepository.saveUser(users);

  const transactionCancelar = {
    _id: transaction._id,
    usuarioId,
    fondoId,
    tipo: "cancelado",
    monto: transaction.monto,
  };

  await transactionsRepository.updateTransactions(transactionCancelar);

  if (users.notificaciones === "email") {
    enviarEmails(users.email, `Suscripción exitosa al fondo ${fund.nombre}`);
  } else {
    enviarSMS(users.telefono, `Suscripción exitosa al fondo ${fund.nombre}`);
  }

  return { fund, message: "Cancelación realizada con éxito." };
};

module.exports = {
  getTransactions,
  getTransactionUserId,
  postOpenFund,
  postCancelFund,
};
