import { useEffect } from "react";
import { useSelector } from "react-redux";

const useIsLoggedIn = ({ ok, cancel }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = useSelector((state) => !!state.auth.jwt);
  const isLoggedUser = user?.token ?? token;

  useEffect(() => {
    if (isLoggedUser) {
      ok && ok();
    } else {
      cancel && cancel();
    }
  }, [isLoggedUser, ok, cancel]);
};

export default useIsLoggedIn;
