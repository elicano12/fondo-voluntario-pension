const {
  transaccionesRepository,
  fondosRepository,
  usuariosRepository,
} = require("../repositories/");
// const { enviarSMS, enviarEmails } = require("../utils");
const { NotFoundError, BadRequestError } = require("../utils/errorHandler");

const getTransacciones = async () => {
  const transacciones = await transaccionesRepository.getTransacciones();

  if (transacciones.length === 0) {
    throw new NotFoundError("transacciones not found");
  }

  return transacciones;
};

const getTransaccionesUsuarioId = async (id, tipo) => {
  if (!id) {
    throw new BadRequestError("El campo id es requerido");
  }

  const transacciones = await transaccionesRepository.getTransaccionesUsuarioId(
    id,
    tipo
  );
  return transacciones;
};

const postAperturaFondo = async (usuarioId, fondoId, monto, tipo) => {
  try {

    if (!usuarioId || !fondoId || !monto) {
        throw new BadRequestError("Faltan campos requeridos: usuarioId, fondoId y monto");
    }

    const usuario = await usuariosRepository.getUsuarioById(usuarioId);
    const fondo = await fondosRepository.getFondoPensionesById(fondoId);

    if (usuario == null || fondo == null) {
      throw new NotFoundError("Usuario o fondo no encontrados");
    }


    if (usuario.saldo < monto) {
      throw new BadRequestError(
        `No tiene saldo disponible para vincularse al fondo ${fondo.nombre}`
      );
    }

    if (fondo.montoMinimo > monto) {
      throw new BadRequestError(
        `El fondo ${fondo.nombre} no cumple con el monto mínimo de ${fondo.montoMinimo}`
      );
    }

    usuario.saldo -= monto;
    
    await usuariosRepository.saveUsuario(usuario);

    const transaccion = {
      usuarioId,
      fondoId,
      monto,
      tipo,
    };

    await transaccionesRepository.saveTransacciones(transaccion);

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

    return { fondo, message: "Suscripción realizada con éxito." };
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

const postCancelacionFondo = async (usuarioId, fondoId) => {
  try {
    if (!usuarioId || !fondoId) {
        throw new BadRequestError("Faltan campos requeridos: usuarioId, fondoId ");
    }

    const fondo = await fondosRepository.getFondoPensionesById(fondoId);
    const usuario = await usuariosRepository.getUsuarioById(usuarioId);

    if (fondo == null || usuario == null) {
      throw new NotFoundError("Usuario o Fondo no encontrado");
    }

    const transaccion =
      await transaccionesRepository.getTransaccionesCancelacion(
        usuarioId,
        fondoId
      );

    if (!transaccion) {
      throw new NotFoundError(
        `No se encontró la transacción activa al fondo ${fondo.nombre}`
      );
    }

    usuario.saldo += transaccion.monto;

    await usuariosRepository.saveUsuario(usuario);

    const transaccionCancelar = {
      _id: transaccion._id,
      usuarioId,
      fondoId,
      tipo: "cancelado",
      monto: transaccion.monto,
    };

    await transaccionesRepository.updateTransacciones(transaccionCancelar);

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
  getTransacciones,
  getTransaccionesUsuarioId,
  postAperturaFondo,
  postCancelacionFondo,
};
