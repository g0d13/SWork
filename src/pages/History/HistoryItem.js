import { Box, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchLogById, fetchLogHistory } from "../../api/logsAPI";
import Loading from "../../components/Loading";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@material-ui/lab";
import { Check, Receipt } from "@material-ui/icons";

import useUiTitle from "../../hooks/useUiTitle";

const GTimeLineItem = ({ text, opposite, icon }) => {
  return (
    <TimelineItem>
      <TimelineOppositeContent>
        <Typography color="textSecondary">{opposite}</Typography>
      </TimelineOppositeContent>
      <TimelineSeparator>
        {icon ?? <TimelineDot variant="outlined" />}
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>{text}</TimelineContent>
    </TimelineItem>
  );
};

const GenerateRequestTimeline = ({ logId }) => {
  const logHistory = useQuery(["logHistory", logId], () =>
    fetchLogHistory(logId)
  );
  if (logHistory.isLoading) return <Loading />;

  return logHistory.data.map((history) => (
    <React.Fragment>
      <GTimeLineItem
        key={history.id}
        text={`Solicitud ${history.description}`}
        opposite={new Date(history.createdAt).toDateString()}
        icon={<Receipt />}
      />
      {history.repair && (
        <GTimeLineItem
          text={`Reparada ${history.repair.id}`}
          opposite={new Date(history.repair.createdAt).toDateString()}
        />
      )}
    </React.Fragment>
  ));
};

const HistoryItem = ({ id }) => {
  const [logState, setLogState] = useState({});
  const logQuery = useQuery(["log", id], () => fetchLogById(id));
  useUiTitle(logState?.name);
  useEffect(() => {
    setLogState(logQuery.data);
  }, [logQuery.data]);

  if (logQuery.isLoading) return <Loading />;

  return (
    <Box>
      <Timeline align="alternate">
        <GTimeLineItem
          text={`Bitacora ${logQuery.data.name}`}
          opposite={new Date(logQuery.data.createdAt).toDateString()}
          icon={<Check />}
        />
        <GenerateRequestTimeline logId={id} />
      </Timeline>
    </Box>
  );
};
export default HistoryItem;
