import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useStateFetch = (selector, reducer) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reducer);
  }, [dispatch]);
};

export default useStateFetch;
