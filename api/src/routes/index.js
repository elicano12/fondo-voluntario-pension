const express = require("express");
const fondoRouter = require("./fondos.routes");
const usuariosRouter = require("./usuarios.routes");

const router = express.Router();

router.use("/fondos", fondoRouter);
router.use("/usuarios", usuariosRouter);

module.exports = router;
