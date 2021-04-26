import { useEffect, useState } from "react";

export const useUserData = () => {
  const data = JSON.parse(window.localStorage.getItem("user"));
  const [user, setUser] = useState({});
  useEffect(() => {
    setUser(data);
  }, [data]);

  return user;
};
