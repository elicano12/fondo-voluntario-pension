const express = require("express");
const fondosController = require("../controllers/fondos.controller");

const fondosRouter = express.Router();

fondosRouter.get("/", fondosController.getFondosPensiones);

module.exports = fondosRouter;
