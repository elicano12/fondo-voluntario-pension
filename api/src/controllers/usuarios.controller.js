const { usuariosServices } = require("../services");

const getUsuarios = async (req, res, next) => {
  try {
    const usuarios = await usuariosServices.getUsuarios();
    return res.json(usuarios);
  } catch (err) {
    next(err);
  }
};

const getUsuarioById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const usuario = await usuariosServices.getUsuarioById(id);
    return res.json(usuario);
  } catch (err) {
    next(err);
  }
};

const postUsuarios = async (req, res, next) => {
  try {
    const { nombre, email, telefono, saldo, notificaciones } = req.body;

    const usuarioSave = await usuariosServices.postUsuarios(
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
  getUsuarios,
  getUsuarioById,
  postUsuarios,
};
