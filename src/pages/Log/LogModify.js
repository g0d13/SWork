import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import { Add } from "@material-ui/icons";
import { useSelector } from "react-redux";
import SearchAdd from "../../components/SearchAdd";
import { fetchCategories } from "../../store/categoriesSlice";
import { selectAll as selectAllCategories } from "../../store/categoriesSlice";
import useUiTitle from "../../hooks/useUiTitle";
import useStateFetch from "../../hooks/useStateFetch";

const useStyles = makeStyles({
  blockWidth: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  label: {
    color: "rgba(0, 0, 0, 0.54)",
  },
});

const LogModify = (props) => {
  const classes = useStyles();
  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categoriesList = useSelector(selectAllCategories);

  useUiTitle(props.id ? "Editar bitacora" : "Agregar bitacora");
  useStateFetch(categoriesList, fetchCategories());

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography className={classes.label}>Datos generales</Typography>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.blockWidth}>
          <TextField variant="outlined" name="name" fullWidth label="Nombre " />
        </Grid>
        <Grid item xs={12} sm={6} className={classes.blockWidth}>
          <TextField
            variant="outlined"
            fullWidth
            label="Detalles"
            name="details"
          />
        </Grid>
        <Grid item xs={12} sm={6} className={classes.blockWidth}>
          <Typography color="textSecondary">Categorias</Typography>
          <Box>
            {selectedCategories.map((el) => (
              <Chip label={el.name} variant="outlined" key={el.categoryId} />
            ))}
            <IconButton
              color="primary"
              component="span"
              onClick={() => setShowCategories(!showCategories)}
            >
              <Add />
            </IconButton>
            <SearchAdd
              open={showCategories}
              title="categoria"
              onClose={(v) => setShowCategories(v)}
              onSelect={(v) => setSelectedCategories([...v])}
              selected={selectedCategories}
              searchIn={categoriesList}
              itemKey="categoryId"
              textKey="name"
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.blockWidth}>
          <Typography className={classes.label}>Mecanico encargado</Typography>
          <div>
            <Chip label="Mecanico" />
            <IconButton color="primary" component="span">
              <Add />
            </IconButton>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Button color="primary">Guardar</Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default LogModify;
