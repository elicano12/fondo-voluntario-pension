const express = require("express");
const {fondoController} = require("../controllers");

const fondosRouter = express.Router();

fondosRouter.get("/", fondoController.getFondosPensiones);
fondosRouter.get("/fondo-id", fondoController.getFondosPensionesById);
fondosRouter.post("/crear-tipo-fondos", fondoController.postFondosPensiones);

module.exports = fondosRouter;
