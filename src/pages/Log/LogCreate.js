import React from "react";
import { useNavigate } from "@reach/router";
import { postLogWithData } from "../../api/logsAPI";
import { useQueryClient, useMutation } from "react-query";
import useUiTitle from "../../hooks/useUiTitle";

import LogForm from "./LogForm";

const LogUpdate = () => {
  const navigate = useNavigate();

  useUiTitle("Agregar bitacora");

  const queryClient = useQueryClient();
  const onSuccess = () => queryClient.invalidateQueries("logs");

  const postLog = useMutation("logs", postLogWithData, { onSuccess });

  const handleSubmit = (data) => {
    postLog.mutate(data);
    navigate(-1);
  };

  return (
    <LogForm
      defaultValues={{ selectedCategories: [] }}
      onFormSubmit={handleSubmit}
    />
  );
};

export default LogUpdate;
