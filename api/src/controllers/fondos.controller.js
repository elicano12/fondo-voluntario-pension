const { fondosServices } = require("../services");

const getFondosPensiones = async (req, res, next) => {
  try {
    const fondoPensiones = await fondosServices.getFondosPensiones();
    return res.json(fondoPensiones);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getFondosPensiones,
};
