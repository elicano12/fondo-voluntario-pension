const mongoose = require("mongoose");
const config = require("../config");
const { Schema } = mongoose;

const TransaccionSchema = new Schema({
  usuarioId: { type: Schema.Types.ObjectId, ref: "Usuario" },
  fondoId: { type: Schema.Types.ObjectId, ref: "Fondo" },
  tipo: { type: String, enum: ["suscripción", "cancelación"] },
  monto: { type: Number, required: true },
  fecha: { type: Date, default: Date.now },
  identificadorUnico: { type: String, unique: true, required: true },
});

const TransaccionModel = mongoose.model(config.collection, TransaccionSchema);

module.exports = { TransaccionModel };
