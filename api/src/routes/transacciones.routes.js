const express = require("express");
const { transaccionesController } = require("../controllers");

const transaccionesRouter = express.Router();

transaccionesRouter.get("/", transaccionesController.getTransacciones );
transaccionesRouter.get("/usuarioId", transaccionesController.getTransaccionesUsuarioId);
transaccionesRouter.post("/apertura-fondos", transaccionesController.postAperturaFondo);
transaccionesRouter.post("/cancelacion-fondos", transaccionesController.postCancelacionFondo);

module.exports = transaccionesRouter;
