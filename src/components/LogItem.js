import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  IconButton,
} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import React, { useState } from "react";
import { useNavigate } from "@reach/router";
import { makeStyles } from "@material-ui/core/styles";
import { Edit, Delete } from "@material-ui/icons";
import ConfirmDialog from "./ConfirmDialog";
import { useDispatch } from "react-redux";
import { deleteLog } from "../store/slices/logs";
import Permission from "./Permission";

const useStyles = makeStyles({
  chips: {
    display: "flex",
    gap: "2px",
    marginTop: "10px",
  },
});

const LogItem = ({ log }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState();
  const dispatch = useDispatch();

  const handleClickCard = () => {
    navigate(`/log/request/${log.id}`);
  };

  const handleClickEdit = (event) => {
    event.stopPropagation();
    navigate(`/log/${log.id}`);
  };

  const handleClickDelete = (event) => {
    event.stopPropagation();
    setOpenDialog(true);
  };

  const handleClose = (value) => {
    if (value) {
      dispatch(deleteLog(log.id));
    }
    setOpenDialog(false);
  };

  const actions = (hovered) => (
    <React.Fragment>
      <Permission permission="log:update">
        <IconButton
          aria-label="settings"
          size="small"
          onClick={handleClickEdit}
        >
          <Edit fontSize="small" />
        </IconButton>
      </Permission>
      <Permission permission="log:delete">
        <IconButton
          size="small"
          aria-label="delete"
          onClick={handleClickDelete}
        >
          <Delete fontSize="small" />
        </IconButton>
      </Permission>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Card onClick={() => handleClickCard()} variant="outlined">
        <CardActionArea component="div">
          <CardHeader
            title={log.name}
            subheader={log?.mechanic?.firstName || "Sin mecanico encargado"}
            action={actions()}
          />
          <CardContent>
            <Box className={classes.chips}>
              {log.categories.length === 0 ? (
                <Chip label={"Sin categorias definidas"} size="small" />
              ) : (
                log.categories.map((el) => (
                  <Chip
                    label={el.name}
                    size="small"
                    variant="outlined"
                    key={el.id}
                  />
                ))
              )}
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
      <ConfirmDialog open={openDialog} onClose={handleClose} />
    </React.Fragment>
  );
};

export default LogItem;
