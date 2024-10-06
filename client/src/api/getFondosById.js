import axios from "axios";
import conf from "../conf";

const getFondoById = async (id) => {
  try {
    const apiUrl = `${conf.apiUrl}/fondos/fondo-id`;
    const response = await axios.get(apiUrl, {
      params: {
        id: id,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error encontrando el fondo:", error);
    throw error;
  }
};

export default getFondoById;
