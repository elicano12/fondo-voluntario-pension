const mongoose = require("mongoose");
const config = require("../config");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    id: { type: Number, required: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    id_fondo: { type: String, required: true },
    monto_aportado: { type: String, required: true },   
    monto_disponible: { type: String, required: true },
    monto_retirado: { type: String, required: true },
    monto_total_retirado: { type: String, required: true },
  },
  { timestamps: true }
);

const UserModel = mongoose.model(config.collectionUser, UserSchema);

module.exports = { UserModel };
