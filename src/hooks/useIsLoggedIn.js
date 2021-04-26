import { useEffect } from "react";

const useIsLoggedIn = ({ ok, cancel }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedUser = user?.token;

  useEffect(() => {
    if (isLoggedUser) {
      ok && ok();
    } else {
      cancel && cancel();
    }
  }, [isLoggedUser, ok, cancel]);
};

export default useIsLoggedIn;
