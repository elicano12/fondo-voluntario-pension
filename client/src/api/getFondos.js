import axios from "axios";
import conf from "../conf";

const getFondos = async (id) => {
  try {
    const apiUrl = `${conf.apiUrl}/fondos`;
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error encontrando el fondo:", error);
    throw error;
  }
};

export default getFondos;