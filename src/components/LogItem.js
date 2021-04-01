import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import React from "react";
import { useNavigate } from "@reach/router";
import { makeStyles } from "@material-ui/core/styles";
import { Edit, Delete } from "@material-ui/icons";

const useStyles = makeStyles({
  cardRoot: {},
  chips: {
    display: "flex",
    gap: "2px",
    marginTop: "10px",
  },
});

const LogItem = ({ log }) => {
  const navigate = useNavigate();
  const classes = useStyles();

  const handleClickEdit = (event) => {
    event.stopPropagation();
    navigate(`/log/${log.logId}`);
  };

  const handleClickDelete = (event) => {
    event.stopPropagation();
  };

  return (
    <Card className={classes.cardRoot} variant="outlined">
      <CardActionArea
        onClick={(ev) => {
          navigate(`/log/request/${log.logId}`);
        }}
      >
        <CardHeader
          title={log.name}
          subheader={log.mechanic.firstName}
          action={
            <>
              <IconButton aria-label="settings" onClick={handleClickEdit}>
                <Edit />
              </IconButton>
              <IconButton aria-label="delete" onClick={handleClickDelete}>
                <Delete />
              </IconButton>
            </>
          }
        />
        <CardContent>
          <Box className={classes.chips}>
            {log.categories.map((el) => {
              return (
                <Chip
                  label={el.name}
                  size="small"
                  variant="outlined"
                  key={el.categoryId}
                />
              );
            })}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default LogItem;
