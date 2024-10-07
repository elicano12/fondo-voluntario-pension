const express = require("express");
const {fondoController} = require("../controllers");
const { fondoIdSchema, crearFondosSchema } = require("../middlewares/validators/fondos.validator");
const validateRequest = require("../middlewares/validators");

const fondosRouter = express.Router();

fondosRouter.get("/", fondoController.getFondosPensiones);
fondosRouter.get("/fondo-id", validateRequest(fondoIdSchema), fondoController.getFondosPensionesById);
fondosRouter.post("/crear-tipo-fondos", validateRequest(crearFondosSchema), fondoController.postFondosPensiones);

module.exports = fondosRouter;
