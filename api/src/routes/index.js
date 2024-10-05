const express = require("express");
const fondoRouter = require("./fondos.routes");
const aperturaFondosRouter = require("./aperturaFondos.routes");

const router = express.Router();

router.use("/fondos-pensiones", fondoRouter);
router.use("/apertura-fondos", aperturaFondosRouter);

module.exports = router;
