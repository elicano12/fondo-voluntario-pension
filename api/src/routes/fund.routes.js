const express = require("express");
const { fundController } = require("../controllers");
const {
  createfundsSchema,
  fundIdSchema,
} = require("../middlewares/validators/fund.validator");
const validateRequest = require("../middlewares/validators");

const fundRouter = express.Router();

fundRouter.get("/", fundController.getFundPensions);
fundRouter.get(
  "/fondoId/:id",
  validateRequest(fundIdSchema),
  fundController.getFundPensionsById
);
fundRouter.post(
  "/crear-tipo-fondos",
  validateRequest(createfundsSchema),
  fundController.postFundPensions
);

module.exports = fundRouter;
