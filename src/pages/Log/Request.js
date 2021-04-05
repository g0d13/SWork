import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";

import { modifyUiTitle } from "../../store/uiSlice";
import ChipSelector from "../../components/ChipSelector";
import SearchAdd from "../../components/SearchAdd";
import { fetchMachines, selectAll } from "../../store/machinesSlice";

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
  const dispatch = useDispatch();
  const classes = useStyles();
  const [priority, setPriority] = useState();
  const [showMachines, setShowMachines] = useState(false);
  const machineList = useSelector(selectAll);
  const [selectedMachines, setSelectedMachines] = useState([]);

  useEffect(() => {
    dispatch(modifyUiTitle("Hacer solicitud"));
    if (machineList.length === 0) dispatch(fetchMachines());
  }, [dispatch]);

  const handleSelectedMachines = (machines) => {
    setSelectedMachines([...machines]);
  };

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
        <Button color="primary">Enviar</Button>
      </Grid>
    </Grid>
  );
};
export default Request;
