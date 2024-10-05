const express = require("express");
const { usuariosController } = require("../controllers");

const usuariosRouter = express.Router();

usuariosRouter.get("/", usuariosController.getUsuarios );
usuariosRouter.post("/crear-usuarios", usuariosController.postUsuarios);

module.exports = usuariosRouter;
