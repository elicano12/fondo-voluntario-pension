import { useState, useEffect } from "react";
import postAperturaFondos from "../api/postAperturaFondos";

const useAperturaFondos = ({ usarioId, fondoId, tipo, monto }) => {
    const [mensaje, setMensaje] = useState('');
    const [fondoData, setFondoData] = useState(null); 
    const [error, setError] = useState(null);

  const fetchAperturaFondos = async () => {
    try {

      const response = await postAperturaFondos({ usarioId, fondoId, tipo, monto });
      setMensaje(response.data.message);
      setFondoData(response.data.fondo);

      

    } catch (err) {
      setError(err.message);
    } 
  };

  useEffect(() => {
    fetchAperturaFondos();
  }, []);

  return { mensaje, error, fondoData };
};

export default useAperturaFondos;
