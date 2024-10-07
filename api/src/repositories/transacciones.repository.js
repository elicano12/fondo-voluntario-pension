const { TransaccionModel } = require("../models/transacciones.models");
const { Types } = require("mongoose");

const getTransacciones = () => {
  const transacciones = TransaccionModel.find();
  return transacciones;
};

const getTransaccionesUsuarioId = async (id, tipo) => {
  const transacciones = TransaccionModel.find({ usuarioId: id, tipo: tipo });
  return transacciones;
};

const saveTransacciones = async (transacciones) => {
  const transaccion = new TransaccionModel({
    ...transacciones,
    unicoId: new Types.ObjectId().toString(),
  });
  return await transaccion.save();
};

const updateTransacciones = async (transacciones) => {
  const updatedTransaccion = await TransaccionModel.findByIdAndUpdate(
    { _id: transacciones._id },
    { $set: { tipo: transacciones.tipo } },
    { new: true }
  );
  return updatedTransaccion;
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
  getTransaccionesUsuarioId,
  saveTransacciones,
  updateTransacciones,
  getTransaccionesCancelacion,
};
