import { useEffect, useState } from "react";

export const useAuth = (key) => {
  const [val, setVal] = useState(localStorage.getItem(key));
  useEffect(() => {
    const handler = () =>
      val !== localStorage.getItem(key) && setVal(localStorage.getItem(key));
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, [key, val]);

  useEffect(() => {
    setVal(localStorage.getItem(key));
  }, [key]);

  return val;
};
