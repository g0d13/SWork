import React, { useState } from "react";
import * as yup from "yup";
import { useQueryClient, useMutation, useQueries } from "react-query";
import { useFormik } from "formik";
import { useNavigate } from "@reach/router";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Chip,
  LinearProgress,
  Typography,
} from "@material-ui/core";

import ChipSelector from "../../components/ChipSelector";
import useUiTitle from "../../hooks/useUiTitle";
import TextInput from "../../components/TextInput";
import Loading from "../../components/Loading";
import GridView from "../../components/GridView";
import SearchAddWrapper from "../../components/SearchAddWrapper";

import { fetchMachines } from "../../api/machinesAPI";
import { fetchLogById } from "../../api/logsAPI";
import { makeRequest } from "../../api/requestAPI";
import { priorityList } from "../../utils/constats";

const useStyles = makeStyles({
  label: {
    color: "rgba(0, 0, 0, 0.54)",
  },
  chipContainer: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },
  subtitle: {
    paddingBottom: "0 !important",
  },
});

const validationSchema = yup.object({
  description: yup
    .string()
    .required("Detalles requeridos")
    .min(2, "Detalles muy corto")
    .max(500, "Detalles es muy largo"),
  problemCode: yup
    .string()
    .required("Codigo requerido")
    .min(2, "Codigo de problema muy corto")
    .max(100, "Codigo de problema muy largo"),
});

const Request = (props) => {
  const classes = useStyles();
  const [priority, setPriority] = useState("LOW");
  const showMachine = useState(false);
  const selectedMachines = useState([]);

  const navigate = useNavigate();

  useUiTitle("Crear solicitud");
  const [machines, logs] = useQueries([
    { queryKey: "machines", queryFn: fetchMachines },
    { queryKey: ["logs", props.id], queryFn: () => fetchLogById(props.id) },
  ]);

  const queryClient = useQueryClient();
  const onSuccess = () => queryClient.invalidateQueries("requests");
  const newRequest = useMutation("requests", makeRequest, { onSuccess });

  const formik = useFormik({
    initialValues: {
      description: "",
      problemCode: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const request = {
        logId: props.id,
        priority: priority,
        machineId: selectedMachines[0][0].id,
      };
      newRequest.mutate({ ...request, ...values });
      navigate(-1);
    },
  });

  if (machines.isLoading) return <Loading />;
  if (logs.isLoading) return <Loading />;

  return (
    <form onSubmit={formik.handleSubmit}>
      <GridView>
        <Typography sm={12} className={classes.label}>
          Datos generales - {logs.data.details}
        </Typography>
        <TextInput
          name="problemCode"
          label="Codigo del problema"
          formik={formik}
        />
        <TextInput
          multiline
          name="description"
          label="Descripcion"
          formik={formik}
        />
        <Typography sm={12} className={classes.label}>
          Prioridad
        </Typography>
        <ChipSelector
          sm={12}
          items={priorityList}
          selected={priority}
          onSelect={setPriority}
        />
        <Typography sm={12} className={classes.label}>
          Maquina
        </Typography>
        <Box sm={12} className={classes.chipContainer}>
          {selectedMachines[0].map((el) => (
            <Chip key={el.id} label={el.model} variant="outlined" />
          ))}
          <SearchAddWrapper
            show={showMachine}
            config={{
              title: "maquina",
              selectedItems: selectedMachines,
              searchIn: machines.data,
              textKey: "identifier",
              apiName: "machine",
              onlyOne: true,
            }}
          />
        </Box>
        {newRequest.isLoading && <LinearProgress sm={12} />}
        <Button sm={12} color="primary" type="submit">
          Enviar
        </Button>
      </GridView>
    </form>
  );
};
export default Request;
