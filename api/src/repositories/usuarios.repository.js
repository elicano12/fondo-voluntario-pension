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

const postUsuario = async (req, res) => {
  const usuario = new UsuariosModel({
    nombre: req.body.nombre,
    email: req.body.email,
    telefono: req.body.telefono,
    saldo: req.body.saldo,
    notificaciones: req.body.notificaciones,
  });
  await usuario.save();
  return res.status(201).json(usuario);
};

module.exports = {
  getUsuarios,
  getUsuarioById,
  saveUsuario,
  postUsuario,
};
