const mongoose = require("mongoose");
const config = require("../config");
const { Schema } = mongoose;

const TransaccionSchema = new Schema({
  usuarioId: { type: Schema.Types.ObjectId, ref: "usuarios", required: true },
  fondoId: { type: Schema.Types.ObjectId, ref: "fondos", required: true },
  tipo: { type: String, enum: ["apertura", "cancelado"], required: true },
  monto: { type: Number, required: true },
  fecha: { type: Date, default: Date.now },
  idUnico: { type: String, unique: true, required: true } 
});

const TransaccionModel = mongoose.model(config.collectionTransaccion, TransaccionSchema);

module.exports = { TransaccionModel };
