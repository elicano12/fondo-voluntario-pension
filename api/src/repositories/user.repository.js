const {UserModel} = require("../models/user.model");

const postUser = async (req, res) => {
    const dataUser = new UserModel({
      id: req.body.id,
      nombre: req.body.nombre,
      monto: req.body.monto,
      active: true,
    });
    const save = await dataUser.save();
    return res.status(201).json({ user: save });
  };

  module.exports = { postUser };
