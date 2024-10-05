const { userRepository } = require("../repositories/");
const NotFoundError = require("../utils/errorHandler.js");

const getUsuarios = async () => {
  const usuarios = await userRepository.getUsuarios();

  if (usuarios.length === 0) {
    throw new NotFoundError("usuarios not found");
  }

  return usuarios;
};

const postUsuarios = async (req, res) => {
  if (!req.body.nombre || !req.body.email || !req.body.telefono) {
    throw new Error("Missing required fields: nombre, email, telefono");
  }

  await userRepository.postUsuario(req, res);
};

module.exports = {
  getUsuarios,
  postUsuarios,
};
