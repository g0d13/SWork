import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useStateFetch = (selector, reducer) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (selector.length === 0) {
      dispatch(reducer);
    }
  }, []);
};

export default useStateFetch;
