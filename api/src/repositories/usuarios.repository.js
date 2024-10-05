const { UsariosModel } = require("../models/usuarios.model");

const getUsuarios = () => {
  const usuarios = UsariosModel.find();
  return usuarios;
};

const postUsuario = async (req, res) => {
  const usuario = new UsariosModel({
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
  postUsuario,
};
