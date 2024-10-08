const mongoose = require("mongoose");
const config = require("../config");
const { Schema } = mongoose;

const fundSchema = new Schema(
  {
    nombre: { type: String, required: true },
    montoMinimo: { type: Number, required: true },
    categoria: { type: String, enum: ['FPV', 'FIC'] },
  },
  { timestamps: true }
);

const FundModel = mongoose.model(config.collectionFund, fundSchema);

module.exports = { FundModel };
