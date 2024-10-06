import { useState, useEffect } from "react";
import getFondos from "../api/getFondos";

const useFondos = () => {
  const [fondos, setFondos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFondos = async () => {
    try {
      setLoading(true);
      const fondos = await getFondos();
      setFondos(fondos);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFondos();
  }, []);

  return { fondos, loading, error };
};

export default useFondos;
