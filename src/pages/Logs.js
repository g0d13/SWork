import { Grid } from "@material-ui/core";
import { useQuery } from "react-query";
import Loading from "../components/Loading";
import LogItem from "../components/LogItem";
import { useNavigate } from "@reach/router";
import { fetchLogs } from "../api/logsAPI";
import useUiTitle from "../hooks/useUiTitle";

const Logs = () => {
  const logsQuery = useQuery("logs", fetchLogs);
  const navigate = useNavigate();
  useUiTitle("Inicio");

  if (logsQuery.isLoading) return <Loading />;
  if (logsQuery.isError) return navigate("/login");

  return (
    <Grid container spacing={3}>
      {logsQuery.data.map((el, index) => (
        <Grid item xs={12} sm={6} lg={4} key={el.id}>
          <LogItem log={el} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Logs;
