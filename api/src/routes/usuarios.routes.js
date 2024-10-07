const express = require("express");
const { usuariosController } = require("../controllers");
const {
  crearUsuarioSchema,
  usuarioIdSchema,
} = require("../middlewares/validators/usuarios.validator");
const validateRequest = require("../middlewares/validators");

const usuariosRouter = express.Router();

usuariosRouter.get("/", usuariosController.getUsuarios);
usuariosRouter.get(
  "/usuarioId/:id",
  validateRequest(usuarioIdSchema),
  usuariosController.getUsuarioById
);
usuariosRouter.post(
  "/crear-usuarios",
  validateRequest(crearUsuarioSchema),
  usuariosController.postUsuarios
);

module.exports = usuariosRouter;
