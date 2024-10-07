const express = require("express");
const fundRouter = require("./fund.routes");
const usersRouter = require("./users.routes");
const transactionsRouter = require("./transaction.routes");

const router = express.Router();

router.use("/fondos", fundRouter);
router.use("/usuarios", usersRouter);
router.use("/transacciones", transactionsRouter);

module.exports = router;
