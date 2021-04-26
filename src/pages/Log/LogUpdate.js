import React from "react";
import { useNavigate } from "@reach/router";
import { fetchLogById, putLogWithData } from "../../api/logsAPI";
import { useQuery, useQueryClient, useMutation } from "react-query";
import useUiTitle from "../../hooks/useUiTitle";
import { CircularProgress } from "@material-ui/core";

import LogForm from "./LogForm";

const LogUpdate = (props) => {
  const navigate = useNavigate();

  useUiTitle("Editar bitacora");

  const queryClient = useQueryClient();
  const onSuccess = () => queryClient.invalidateQueries("logs");

  const logsQuery = useQuery(["logs", props.id], () => fetchLogById(props.id));

  const updateLog = useMutation("logs", putLogWithData, { onSuccess });

  const handleSubmit = (data) => {
    updateLog.mutate({ id: props.id, ...data });
    navigate(-1);
  };

  if (logsQuery.isLoading) return <CircularProgress />;

  return <LogForm defaultValues={logsQuery.data} onFormSubmit={handleSubmit} />;
};

export default LogUpdate;
