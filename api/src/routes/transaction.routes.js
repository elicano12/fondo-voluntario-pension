const express = require("express");
const { transactionsController } = require("../controllers");
const {
  subscriptionSchema,
  cancelSchema,
  userIdSchema,
} = require("../middlewares/validators/transactions.validator");
const validateRequest = require("../middlewares/validators");

const transactionsRouter = express.Router();

transactionsRouter.get("/", transactionsController.getTransactions);
transactionsRouter.get(
  "/usuarioId/:id",
  validateRequest(userIdSchema),
  transactionsController.getTransactionUserId
);
transactionsRouter.post(
  "/apertura-fondos",
  validateRequest(subscriptionSchema),
  transactionsController.postOpenFund
);
transactionsRouter.post(
  "/cancelacion-fondos",
  validateRequest(cancelSchema),
  transactionsController.postCancelFund
);

module.exports = transactionsRouter;
