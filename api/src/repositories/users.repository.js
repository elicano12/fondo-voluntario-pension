const { UsersModel } = require("../models/users.model");

const getUsers = () => {
  const users = UsersModel.find();
  return users;
};

const getUserById = (id) => {
  const users = UsersModel.findById(id);
  return users;
};

const saveUser = async (users) => {
  return await users.save();
};

const postUser = async (nombre, email, telefono, saldo, notificaciones) => {
  const user = new UsersModel({
    nombre: nombre,
    email: email,
    telefono: telefono,
    saldo: saldo,
    notificaciones: notificaciones,
  });
  await user.save();
  return user;
};

module.exports = {
  getUsers,
  getUserById,
  saveUser,
  postUser,
};
