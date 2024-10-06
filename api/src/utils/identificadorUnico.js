const { v4: uuidv4 } = require("uuid");

const identificadorUnico = async () => {
    const idUnico = await uuidv4()
  return idUnico ;
};

module.exports = identificadorUnico;
