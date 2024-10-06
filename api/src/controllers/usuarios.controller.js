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
    const usuario = await usuariosServices.getUsuarioById(req.query.id);
    return res.json(usuario);
  } catch (err) {
    next(err);
  }
};

const postUsuarios = async (req, res, next) => {
  try {
    await usuariosServices.postUsuarios(req, res);
    res.status(201);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUsuarios,
  getUsuarioById,
  postUsuarios,
};
