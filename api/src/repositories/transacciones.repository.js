const { TransaccionModel } = require("../models/transacciones.models");
const { Types } = require("mongoose");

const getTransacciones = () => {
  const transacciones = TransaccionModel.find();
  return transacciones;
};

const postTransacciones = async (usuarioId, fondoId, tipo, monto) => {
  const transacciones = new TransaccionModel({
    usuarioId: usuarioId,
    fondoId: fondoId,
    tipo: tipo,
    monto: monto,
    idUnico: new Types.ObjectId().toString(),
  });

  await transacciones.save();
  return transacciones;
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
