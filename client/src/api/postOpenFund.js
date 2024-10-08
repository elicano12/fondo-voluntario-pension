import axios from "axios";
import conf from "../conf";

const postOpenFund = async ({ usarioId, fondoId, tipo, monto }) => {
  try {
    const apiUrl = `${conf.apiUrl}/transacciones/apertura-fondos`;
    const response = await axios.post(apiUrl, {
      usuarioId: usarioId,
      fondoId: fondoId,
      tipo: tipo,
      monto: monto,
    });
    console.log("=>",response.data)
    return response.data;
  } catch (error) {
    if (error.status === 404) {
      return {error:true, message: error.response.data.message}
    };
    throw error;
  }
};

export default postOpenFund;
