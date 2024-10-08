const { usersServices } = require("../services");

const getUsers = async (req, res, next) => {
  try {
    const usuarios = await usersServices.getUsers();
    return res.json(usuarios);
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const usuario = await usersServices.getUserById(id);
    return res.json(usuario);
  } catch (err) {
    next(err);
  }
};

const postUser = async (req, res, next) => {
  try {
    const { nombre, email, telefono, saldo, notificaciones } = req.body;

    const usuarioSave = await usersServices.postUser(
      nombre,
      email,
      telefono,
      saldo,
      notificaciones
    );
    res.status(201).json(usuarioSave);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUsers,
  getUserById,
  postUser,
};
