const mongoose = require("mongoose");
const config = require("../config");
const { Schema } = mongoose;

const UsuariosSchema = new Schema(
  {
    nombre: { type: String, required: true },
    email: { type: String, required: true },
    telefono: { type: String, required: true },
    saldo: { type: Number, default: 500000 },
    notificaciones: { type: String, enum: ["email", "sms"] },
  },
  { timestamps: true }
);

const UsuariosModel = mongoose.model(config.collectionUsuarios, UsuariosSchema);

module.exports = { UsuariosModel };
