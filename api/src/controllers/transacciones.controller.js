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
    await transaccionesServices.postTransacciones(req, res);
    res.status(201);
  } catch (err) {
    next(err);
  }
};

const postAperturaFondo = async (req, res, next) => {
    try {
        await transaccionesServices.postAperturaFondo(req, res);
        res.status(201);
      } catch (err) {
        next(err);
      }
};

const postCancelacionFondo = async (req, res, next) => {
    try {
        const { usuarioId, fondoId } = req.body;
        await transaccionesServices.postCancelacionFondo(usuarioId, fondoId);
        res.status(201);
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
