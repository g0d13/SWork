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

  const handleClickCard = () => {
    navigate(`/log/request/${log.logId}`);
  };

  const handleClickEdit = (event) => {
    event.stopPropagation();
    navigate(`/log/${log.logId}`);
  };

  const handleClickDelete = (event) => {
    event.stopPropagation();
    setOpenDialog(true);
  };

  const handleClose = (value) => {
    if (value) console.log("Se ha borrado de el elemento");
    setOpenDialog(false);
  };

  const actions = (hovered) => (
    <React.Fragment>
      <IconButton aria-label="settings" size="small" onClick={handleClickEdit}>
        <Edit fontSize="small" />
      </IconButton>
      <IconButton size="small" aria-label="delete" onClick={handleClickDelete}>
        <Delete fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Card onClick={() => handleClickCard()} variant="outlined">
        <CardActionArea component="div">
          <CardHeader
            title={log.name}
            subheader={log.mechanic.firstName}
            action={actions()}
          />
          <CardContent>
            <Box className={classes.chips}>
              {log.categories.map((el) => (
                <Chip
                  label={el.name}
                  size="small"
                  variant="outlined"
                  key={el.categoryId}
                />
              ))}
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
      <ConfirmDialog open={openDialog} onClose={handleClose} />
    </React.Fragment>
  );
};

export default LogItem;
