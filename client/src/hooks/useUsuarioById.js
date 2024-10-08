import { useState, useEffect } from "react";
import getUserById  from "../api/getUsers";

const useUsuarioById = (id) => {

  const [user, setUser] = useState([]);

  const fetchUsers = async (id) => {
      const userData = await getUserById(id);
      setUser(userData);
  };

  useEffect(() => {
    fetchUsers(id);
  }, [id]);

  return { user };
};

export default useUsuarioById;
