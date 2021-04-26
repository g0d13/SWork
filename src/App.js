import React from "react";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { persistQueryClient } from "react-query/persistQueryClient-experimental";
import { createLocalStoragePersistor } from "react-query/createLocalStoragePersistor-experimental";
import store from "./store";
import Routes from "./routes/index";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

const localStoragePersistor = createLocalStoragePersistor();
persistQueryClient({
  queryClient,
  persistor: localStoragePersistor,
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Routes />
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
