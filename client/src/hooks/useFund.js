import { useState, useEffect } from "react";
import getFund from "../api/getFund";

const useFund = () => {
  const [fund, setfund] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchfund = async () => {
    try {
      setLoading(true);
      const fund = await getFund();
      setfund(fund);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchfund();
  }, []);

  return { fund, loading, error };
};

export default useFund;
