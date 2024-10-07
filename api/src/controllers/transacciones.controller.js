const { transaccionesServices } = require("../services");

const getTransacciones = async (req, res, next) => {
  try {
    const transacciones = await transaccionesServices.getTransacciones();
    return res.json(transacciones);
  } catch (err) {
    next(err);
  }
};

const getTransaccionesUsuarioId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const transacciones = await transaccionesServices.getTransaccionesUsuarioId(
      id,
      (tipo = "apertura")
    );
    res.status(201).json(transacciones);
  } catch (err) {
    next(err);
  }
};

const postAperturaFondo = async (req, res, next) => {
  try {
    const { usuarioId, fondoId, monto, tipo } = req.body;
    const { fondo, message } = await transaccionesServices.postAperturaFondo(
      usuarioId,
      fondoId,
      monto,
      tipo
    );
    res.status(201).json({ fondo, message });
  } catch (err) {
    next(err);
  }
};

const postCancelacionFondo = async (req, res, next) => {
  try {
    const { usuarioId, fondoId } = req.body;
    const { fondo, message } = await transaccionesServices.postCancelacionFondo(
      usuarioId,
      fondoId
    );
    res.status(201).json({ fondo, message });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getTransacciones,
  getTransaccionesUsuarioId,
  postAperturaFondo,
  postCancelacionFondo,
};
