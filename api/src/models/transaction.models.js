const mongoose = require("mongoose");
const config = require("../config");
const { Schema } = mongoose;

const TransactionSchema = new Schema({
  usuarioId: { type: Schema.Types.ObjectId, ref: "usuarios", required: true },
  fondoId: { type: Schema.Types.ObjectId, ref: "fondos", required: true },
  tipo: { type: String, enum: ["apertura", "cancelado"], required: true },
  monto: { type: Number, required: true },
  fecha: { type: Date, default: Date.now },
  unicoId: { type: String, unique: true} 
});

const TransactionModel = mongoose.model(config.collectionTransaction, TransactionSchema);

module.exports = { TransactionModel };
