import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@material-ui/core";
import { useQuery } from "react-query";
import { getRequests } from "../api/requestAPI";
import Loading from "../components/Loading";
import React from "react";
import GridView from "../components/GridView";
import Chip from "@material-ui/core/Chip";
import useUiTitle from "../hooks/useUiTitle";
import { AccessTime, Clear } from "@material-ui/icons";
import { useNavigate } from "@reach/router";
import useNotify from "../hooks/useNotify";

const RepairItem = ({ repair }) => {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => {
        navigate(`/repair/${repair.requestid}`);
      }}
      variant="outlined"
    >
      <CardActionArea component="div">
        <CardHeader
          title={repair.problemCode}
          subheader={`Creado: ${repair.createdAt}`}
        />
        <CardContent>
          <Typography>{repair.description}</Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Chip label={repair.priority} color="primary" />
            <IconButton>
              {repair.isFixed === false ? (
                <Clear color="error" />
              ) : (
                <AccessTime color="secondary" />
              )}
            </IconButton>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const Requests = () => {
  const { isLoading, data: repairList } = useQuery("requests", getRequests);

  useUiTitle("Tareas pendientes");

  useNotify();

  if (isLoading) return <Loading />;
  if (repairList.length === 0)
    return <p>Aqui apareceran todas las solicitudes de mantenimiento</p>;
  return (
    <GridView>
      {repairList.map((repair) => (
        <RepairItem key={repair.id} repair={repair} />
      ))}
    </GridView>
  );
};
export default Requests;
