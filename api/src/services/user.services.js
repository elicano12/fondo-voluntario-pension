const { usersRepository } = require("../repositories/index.js");
const { NotFoundError } = require("../utils/errors.js");

const getUsers = async () => {
  const users = await usersRepository.getUsers();

  if (users.length === 0) {
    throw new NotFoundError("Users not found");
  }

  return users;
};

const getUserById = async (id) => {
  const user = await usersRepository.getUserById(id);
  if (user == null) {
    throw new NotFoundError("Users not found");
  }

  return user;
};

const postUser = async (nombre, email, telefono, saldo, notificaciones) => {
  if (!nombre || !email || !telefono) {
    throw new Error("Missing required fields: nombre, email, telefono");
  }

  const userSave = await usersRepository.postUser(
    nombre,
    email,
    telefono,
    saldo,
    notificaciones
  );
  return userSave;
};

module.exports = {
  getUsers,
  getUserById,
  postUser,
};
