const mongoose = require("mongoose");
const config = require("../config");
const { Schema } = mongoose;

const fondoSchema = new Schema(
  {
    nombre: { type: String, required: true },
    montoMinimo: { type: Number, required: true },
    categoria: { type: String, enum: ['FPV', 'FIC'] },
  },
  { timestamps: true }
);

const FondoModel = mongoose.model(config.collection, fondoSchema);

module.exports = { FondoModel };
