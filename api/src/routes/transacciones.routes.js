const express = require("express");
const { transaccionesController } = require("../controllers");
const { subscriptionSchema, cancelacionSchema, usuarioIdSchema } = require("../middlewares/validators/transacciones.validator");
const validateRequest = require("../middlewares/validators");

const transaccionesRouter = express.Router();

transaccionesRouter.get("/", transaccionesController.getTransacciones );
transaccionesRouter.get("/usuarioId", validateRequest(usuarioIdSchema), transaccionesController.getTransaccionesUsuarioId);
transaccionesRouter.post("/apertura-fondos", validateRequest(subscriptionSchema), transaccionesController.postAperturaFondo);
transaccionesRouter.post("/cancelacion-fondos", validateRequest(cancelacionSchema), transaccionesController.postCancelacionFondo);

module.exports = transaccionesRouter;
