import React, { useState } from "react";
import {
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

import ChipSelector from "../../components/ChipSelector";
import SearchAdd from "../../components/SearchAdd";
import { fetchMachines, selectAll } from "../../store/machinesSlice";
import useUiTitle from "../../hooks/useUiTitle";
import useStateFetch from "../../hooks/useStateFetch";
import * as yup from "yup";
import { useFormik } from "formik";

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

const priorityList = ["Baja", "Media", "Alta"];

const Request = (props) => {
  const classes = useStyles();
  const [priority, setPriority] = useState();
  const [showMachines, setShowMachines] = useState(false);
  const machineList = useSelector(selectAll);
  const [selectedMachines, setSelectedMachines] = useState([]);

  useUiTitle("Crear solicitud");

  useStateFetch(machineList, fetchMachines());

  const handleSelectedMachines = (machines) => {
    setSelectedMachines([...machines]);
  };

  const formik = useFormik({
    initialValues: {
      description: "",
      problemCode: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const request = {
        ...values,
        log: props.id,
        priority: priorityList.indexOf(priority),
        machine: selectedMachines[0].machineId,
      };
      console.log(request);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} className={classes.subtitle}>
          <Typography className={classes.label}>Datos generales</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="problemCode"
            label="Codigo del problema"
            variant="outlined"
            value={formik.values.problemCode}
            onChange={formik.handleChange}
            error={
              formik.touched.problemCode && Boolean(formik.errors.problemCode)
            }
            helperText={formik.touched.problemCode && formik.errors.problemCode}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            multiline
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
            label="Descripcion"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} className={classes.subtitle}>
          <Typography className={classes.label}>Prioridad</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ChipSelector items={priorityList} onSelect={(e) => setPriority(e)} />
        </Grid>
        <Grid item xs={12} className={classes.subtitle}>
          <Typography className={classes.label}>Maquina</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box className={classes.chipContainer}>
            {selectedMachines.map((el) => (
              <Chip key={el.machineId} label={el.model} variant="outlined" />
            ))}
            <IconButton color="primary" onClick={() => setShowMachines(true)}>
              <Add />
            </IconButton>
            <SearchAdd
              open={showMachines}
              title="maquina"
              onClose={(v) => setShowMachines(v)}
              onSelect={(v) => handleSelectedMachines(v)}
              selected={selectedMachines}
              searchIn={machineList}
              itemKey="machineId"
              textKey="identifier"
              onlyOne
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button color="primary" type="submit">
            Enviar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
export default Request;
