const express = require("express");
const { usersController } = require("../controllers");
const {
  createUserSchema,
  userIdSchema
} = require("../middlewares/validators/users.validator");
const validateRequest = require("../middlewares/validators");

const usersRouter = express.Router();

usersRouter.get("/", usersController.getUsers);
usersRouter.get(
  "/usuarioId/:id",
  validateRequest(userIdSchema),
  usersController.getUserById
);
usersRouter.post(
  "/crear-usuarios",
  validateRequest(createUserSchema),
  usersController.postUser
);

module.exports = usersRouter;
