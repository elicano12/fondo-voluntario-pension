const { transaccionesServices } = require("../services");

const getTransacciones = async (req, res, next) => {
  try {
    const transacciones = await transaccionesServices.getTransacciones();
    return res.json(transacciones);
  } catch (err) {
    next(err);
  }
};

const postTransacciones = async (req, res, next) => {
  try {
    const { suarioId, fondoId, tipo, monto } = req.body;
    const transaccionSave = await transaccionesServices.postTransacciones(
      suarioId,
      fondoId,
      tipo,
      monto
    );
    res.status(201).json(transaccionSave);
  } catch (err) {
    next(err);
  }
};

const postAperturaFondo = async (req, res, next) => {
  try {
    const { usuarioId, fondoId, monto, tipo } = req.body;
    const { fondo, message } = await transaccionesServices.postAperturaFondo(usuarioId, fondoId, monto, tipo);
    res.status(201).json({ fondo, message });
  } catch (err) {
    next(err);
  }
};

const postCancelacionFondo = async (req, res, next) => {
  try {
    const { usuarioId, fondoId } = req.body;
    const { fondo, message } = await transaccionesServices.postCancelacionFondo(usuarioId, fondoId);
    res.status(201).json({ fondo, message });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getTransacciones,
  postTransacciones,
  postAperturaFondo,
  postCancelacionFondo,
};
