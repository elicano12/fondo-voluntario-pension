const { usuariosRepository } = require("../repositories/");
const NotFoundError = require("../utils/errorHandler.js");

const getUsuarios = async () => {
  const usuarios = await usuariosRepository.getUsuarios();

  if (usuarios.length === 0) {
    throw new NotFoundError("usuarios not found");
  }

  return usuarios;
};

const getUsuarioById = async (id) => {
  const usuario = await usuariosRepository.getUsuarioById(id);
  if (usuario == null) {
    throw new NotFoundError("Usuario no encontrado");
  }

  return usuario;
};

const postUsuarios = async (nombre, email, telefono, saldo, notificaciones) => {
  if (!nombre || !email || !telefono) {
    throw new Error("Missing required fields: nombre, email, telefono");
  }

  const usuarioSave = await usuariosRepository.postUsuario(
    nombre,
    email,
    telefono,
    saldo,
    notificaciones
  );
  return usuarioSave;
};

module.exports = {
  getUsuarios,
  getUsuarioById,
  postUsuarios,
};
