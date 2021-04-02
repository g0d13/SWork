import {
  Box,
  Chip,
  DialogContent,
  DialogTitle,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Close } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  displayTitle: {
    paddingBottom: "0",
    "& *": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
  },
  displayContent: {
    "& .MuiFormControl-root": {
      marginTop: "15px",
    },
    display: "flex",
    flexDirection: "column",
  },
  listText: {
    "& *": {
      fontWeight: "400",
    },
  },
});

const SearchAdd = (props) => {
  const classes = useStyles();
  const { onClose, open } = props;
  console.log(onClose);

  const handleClose = (value) => {
    onClose(value);
  };

  return (
    <Drawer onClose={handleClose} anchor="bottom" open={open}>
      <DialogTitle className={classes.displayTitle}>
        <Typography>Seleccionar {props.title}</Typography>
        <IconButton>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.displayContent}>
        <Box>
          <Chip label="Busqueda 1" />
        </Box>
        <TextField fullWidth label="Buscar" />
      </DialogContent>
      <DialogContent>
        <List>
          <ListItem button onClick={() => {}}>
            <ListItemText className={classes.listText} primary="Agregar" />
          </ListItem>
        </List>
      </DialogContent>
    </Drawer>
  );
};

export default SearchAdd;
