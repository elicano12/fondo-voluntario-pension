const express = require("express");
const aperturaFondoController = require("../controllers/aperturaFondos.controller");

const aperturaFondosRouter = express.Router();

aperturaFondosRouter.post("/apertura-fondos");

module.exports = aperturaFondosRouter;
