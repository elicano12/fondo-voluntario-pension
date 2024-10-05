const mongoose = require("mongoose");
const config = require("../config");
const { Schema } = mongoose;

const fondoSchema = new Schema(
  {
    id: { type: Number, required: true },
    nombre: { type: String, required: true },
    monto_minimo: { type: String, required: true },
    monto: { type: String, required: true },
    categoria: { type: String, required: true },
  },
  { timestamps: true }
);

const FondoModel = mongoose.model(config.collection, fondoSchema);

module.exports = { FondoModel };
