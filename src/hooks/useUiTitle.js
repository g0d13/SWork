import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { modifyUiTitle, modifyActions } from "../store/slices/ui";

const useUiTitle = (title, actions) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(modifyUiTitle(title));
    dispatch(modifyActions(actions));
  }, [dispatch, title, actions]);
};

export default useUiTitle;
