const {
  transaccionesRepository,
  fondosRepository,
  usuariosRepository,
} = require("../repositories/");
const { enviarSMS, enviarEmails } = require("../utils");
const { NotFoundError, BadRequestError } = require("../utils/errorHandler");

const getTransacciones = async () => {
  const transacciones = await transaccionesRepository.getTransacciones();

  if (transacciones.length === 0) {
    throw new NotFoundError("transacciones not found");
  }

  return transacciones;
};

const postTransacciones = async (req, res) => {
  const { tipo, monto } = req.body;
  if (!tipo || !monto) {
    throw new BadRequestError("Missing required fields: tipo and monto");
  }

  await transaccionesRepository.postTransacciones(req, res);
};

const postAperturaFondo = async (req, res) => {
  try {
    const { usuarioId, fondoId, monto, tipo } = req.body;

    if (!usuarioId || !fondoId || !monto) {
      return res.status(400).json({
        message: "Faltan campos requeridos: usuarioId, fondoId and monto",
      });
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

    return res
      .status(200)
      .json({ message: "Suscripción realizada con éxito." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

const postCancelacionFondo = async (req, res) => {
  try {
    const { usuarioId, fondoId } = req.body;

    if (!usuarioId || !fondoId) {
      return res.status(400).json({
        message: "Faltan campos requeridos: usuarioId y fondoId",
      });
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
      usuarioId,
      fondoId,
      tipo: "cancelado",
      monto: transaccion.monto,
    };

    await transaccionesRepository.saveTransacciones(transaccionCancelar);

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

    return res
      .status(200)
      .json({ message: "Cancelación realizada con éxito." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

module.exports = {
  getTransacciones,
  postTransacciones,
  postAperturaFondo,
  postCancelacionFondo,
};
