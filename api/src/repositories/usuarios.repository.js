const { UsuariosModel } = require("../models/usuarios.model");

const getUsuarios = () => {
  const usuarios = UsuariosModel.find();
  return usuarios;
};

const getUsuarioById = (id) => {
  const usuario = UsuariosModel.findById(id);
  return usuario;
};

const saveUsuario = async (usuario) => {
  return await usuario.save();
};

const postUsuario = async (nombre, email, telefono, saldo, notificaciones) => {
  const usuario = new UsuariosModel({
    nombre: nombre,
    email: email,
    telefono: telefono,
    saldo: saldo,
    notificaciones: notificaciones,
  });
  await usuario.save();
  return usuario;
};

module.exports = {
  getUsuarios,
  getUsuarioById,
  saveUsuario,
  postUsuario,
};
