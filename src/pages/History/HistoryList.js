import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Typography,
} from "@material-ui/core";
import GridView from "../../components/GridView";
import { useQuery } from "react-query";
import { fetchDeletedLog } from "../../api/logsAPI";
import Loading from "../../components/Loading";
import React from "react";
import useUiTitle from "../../hooks/useUiTitle";
import { useNavigate } from "@reach/router";

const LogItemView = ({ log }) => {
  const navigate = useNavigate();
  return (
    <Card onClick={() => {}} variant="outlined">
      <CardActionArea
        component="div"
        onClick={() => navigate(`/history/${log.id}`)}
      >
        <CardHeader
          title={log.name}
          subheader={`Creado: ${new Date(log.createdAt).toDateString()}`}
        />
        <CardContent>
          {log.deletedAt && (
            <Typography>
              Eliminado: {new Date(log.deletedAt).toDateString()}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const HistoryList = () => {
  const logQuery = useQuery("logDeleted", fetchDeletedLog);

  useUiTitle("Historial de bitacoras");

  if (logQuery.isLoading) return <Loading />;
  return (
    <GridView>
      {logQuery.data.map((el) => (
        <LogItemView key={el.id} log={el} />
      ))}
    </GridView>
  );
};
export default HistoryList;
