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

const Request = () => {
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

  const handleClickButton = () => {};

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} className={classes.subtitle}>
        <Typography className={classes.label}>Datos generales</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Codigo del problema" variant="outlined" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth multiline label="Descripcion" variant="outlined" />
      </Grid>
      <Grid item xs={12} className={classes.subtitle}>
        <Typography className={classes.label}>Prioridad</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <ChipSelector
          items={["Baja", "Media", "Alta"]}
          onSelect={(e) => setPriority(e)}
        />
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
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Button color="primary" onClick={handleClickButton}>
          Enviar
        </Button>
      </Grid>
    </Grid>
  );
};
export default Request;
