import React from "react";
import { Button, DialogActions, DialogTitle, Drawer } from "@material-ui/core";

function ConfirmDialog(props) {
  const { onClose, open } = props;

  const handleClose = (value) => {
    onClose(value);
  };

  return (
    <Drawer
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      anchor="bottom"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">
        Esta seguro de borrar esta bitacora?
      </DialogTitle>
      <DialogActions>
        <Button onClick={() => handleClose(true)}>Ok</Button>
        <Button color="primary" onClick={() => handleClose(false)}>
          Cancelar
        </Button>
      </DialogActions>
    </Drawer>
  );
}

export default ConfirmDialog;
