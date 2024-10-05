const { usuariosServices } = require("../services");

const getUsuarios = async (req, res, next) => {
  try {
    const usuarios = await usuariosServices.getUsuarios();
    return res.json(usuarios);
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
  postUsuarios,
};
