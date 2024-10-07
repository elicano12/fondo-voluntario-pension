const {
  transactionsRepository,
  fundRepository,
  usersRepository,
} = require("../repositories");
const { enviarSMS, enviarEmails } = require("../utils");
const { NotFoundError, BadRequestError } = require("../utils/errorHandler");

const getTransactions = async () => {
  const transacciones = await transactionsRepository.getTransactions();

  if (transacciones.length === 0) {
    throw new NotFoundError("transacciones not found");
  }

  return transacciones;
};

const getTransactionUserId = async (id, tipo) => {
  if (!id) {
    throw new BadRequestError("El campo id es requerido");
  }

  const transacciones = await transactionsRepository.getTransactionUserId(
    id,
    tipo
  );
  return transacciones;
};

const postOpenFund = async (usuarioId, fondoId, monto, tipo) => {
    if (!usuarioId || !fondoId || !monto) {
      throw new BadRequestError(
        "Faltan campos requeridos: usuarioId, fondoId y monto"
      );
    }

    const usuario = await usersRepository.getUserById(usuarioId);
    const fondo = await fundRepository.getFundPensionsById(fondoId);

    if (usuario == null || fondo == null) {
      throw new NotFoundError("Usuario o fondo no encontrados");
    }

    if (usuario.saldo < monto) {
      throw new NotFoundError(
        `No tiene saldo disponible para vincularse al fondo ${fondo.nombre}`
      );
    }

    if (fondo.montoMinimo > monto) {
      throw new BadRequestError(
        `El fondo ${fondo.nombre} no cumple con el monto mínimo de ${fondo.montoMinimo}`
      );
    }

    usuario.saldo -= monto;

    await usersRepository.saveUser(usuario);

    const transaccion = {
      usuarioId,
      fondoId,
      monto,
      tipo,
    };

    await transactionsRepository.saveTransaction(transaccion);

    if (usuario.notificaciones === "email") {
      enviarEmails(
        usuario.email,
        `Suscripción exitosa al fondo ${fondo.nombre}`
      );
    } else {
      enviarSMS(
        usuario.telefono,
        `Suscripción exitosa al fondo ${fondo.nombre}`
      );
    }

    return { fondo, message: "Suscripción realizada con éxito." };
};

const postCancelFund = async (usuarioId, fondoId) => {
  try {
    if (!usuarioId || !fondoId) {
      throw new BadRequestError(
        "Faltan campos requeridos: usuarioId, fondoId "
      );
    }

    const fondo = await fundRepository.getFundPensionsById(fondoId);
    const usuario = await usersRepository.getUserById(usuarioId);

    if (fondo == null || usuario == null) {
      throw new NotFoundError("Usuario o Fondo no encontrado");
    }

    const transaccion = await transactionsRepository.getCancelTransaction(
      usuarioId,
      fondoId
    );

    if (!transaccion) {
      throw new NotFoundError(
        `No se encontró la transacción activa al fondo ${fondo.nombre}`
      );
    }

    usuario.saldo += transaccion.monto;

    await usersRepository.saveUser(usuario);

    const transaccionCancelar = {
      _id: transaccion._id,
      usuarioId,
      fondoId,
      tipo: "cancelado",
      monto: transaccion.monto,
    };

    await transactionsRepository.updateTransactions(transaccionCancelar);

    // if (usuario.notificaciones === "email") {
    //   enviarEmails(
    //     usuario.email,
    //     `Suscripción exitosa al fondo ${fondo.nombre}`
    //   );
    // } else {
    //   enviarSMS(
    //     usuario.telefono,
    //     `Suscripción exitosa al fondo ${fondo.nombre}`
    //   );
    // }

    return { fondo, message: "Cancelación realizada con éxito." };
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

module.exports = {
  getTransactions,
  getTransactionUserId,
  postOpenFund,
  postCancelFund,
};
