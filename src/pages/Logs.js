import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import { useNavigate } from "@reach/router";

const useStyles = makeStyles({
  cardRoot: {},
  chips: {
    display: "flex",
    gap: "2px",
    marginTop: "10px",
  },
});

const Logs = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} lg={4}>
          <Card className={classes.cardRoot} variant="outlined">
            <CardActionArea
              onClick={(ev) => {
                navigate(`/request`);
              }}
            >
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Subtitulo
                </Typography>
                <Typography variant="h5">Titulo perron</Typography>
                <Box className={classes.chips}>
                  <Chip
                    clickable
                    label="Categoria 1"
                    size="small"
                    variant="outlined"
                  />
                  <Chip label="Categoria 2" size="small" variant="outlined" />
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Logs;
