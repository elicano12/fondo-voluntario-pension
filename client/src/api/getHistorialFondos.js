import axios from "axios";
import conf from "../conf";

const getHistorialFondos = async () => {
  try {
    const apiUrl = `${conf.apiUrl}/transacciones`;
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error encontrando el historial de fondos:", error);
    throw error;
  }
};

export default getHistorialFondos;
