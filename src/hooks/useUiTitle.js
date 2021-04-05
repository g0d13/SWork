import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { modifyUiTitle } from "../store/uiSlice";

const useUiTitle = (title) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(modifyUiTitle(title));
  }, [dispatch, title]);
};

export default useUiTitle;
