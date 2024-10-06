const { TransaccionModel } = require("../models/transacciones.models");
const { Types } = require("mongoose");

const getTransacciones = () => {
  const transacciones = TransaccionModel.find();
  return transacciones;
};

const postTransacciones = async (req, res) => {
  const transacciones = new TransaccionModel({
    usuarioId: req.body.usuarioId,
    fondoId: req.body.fondoId,
    tipo: req.body.tipo,
    monto: req.body.monto,
    idUnico: new Types.ObjectId().toString(),
  });

  await transacciones.save();
  return res.status(201).json(transacciones);
};

const saveTransacciones = async (transacciones) => {
  const transaccion = new TransaccionModel({
    ...transacciones,
    idUnico: new Types.ObjectId().toString(),
  });
  return await transaccion.save();
};

const getTransaccionesCancelacion = async (usuarioId, fondoId) => {
  const transacciones = await TransaccionModel.findOne({
    usuarioId: usuarioId,
    fondoId: fondoId,
    tipo: "apertura",
  });
  return transacciones;
};

module.exports = {
  getTransacciones,
  postTransacciones,
  saveTransacciones,
  getTransaccionesCancelacion,
};
