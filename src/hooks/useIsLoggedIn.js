import { useEffect } from "react";
import { useSelector } from "react-redux";

const useIsLoggedIn = (ok = () => {}, cancel = () => {}) => {
  const isLoggedUser = useSelector((state) => !!state.auth.jwt);
  useEffect(() => {
    if (isLoggedUser === true) {
      ok();
    } else {
      cancel();
    }
  }, [cancel, isLoggedUser, ok]);
};

export default useIsLoggedIn;
