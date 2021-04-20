import React from "react";
import { Provider } from "react-redux";
import { makeStyles } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import Slide from "@material-ui/core/Slide";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

import store from "./store";
import Notifier from "./components/Notifier";
import Routes from "./routes/index";

const useStyles = makeStyles((theme) => ({
  container: {
    top: "60px",
    [theme.breakpoints.down("sm")]: {
      "& > .MuiCollapse-container > .MuiCollapse-wrapper  > .MuiCollapse-wrapperInner": {
        width: "100%", // occupy full-width on xs screens
      },
    },
  },
}));

const queryClient = new QueryClient();

function App() {
  const classes = useStyles();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <SnackbarProvider
          maxSnack={3}
          autoHideDuration={3000}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          classes={{
            containerRoot: classes.container,
          }}
          TransitionComponent={Slide}
        >
          <Notifier />
          <Routes />
        </SnackbarProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
