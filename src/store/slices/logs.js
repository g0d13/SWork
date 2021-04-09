import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import httpClient from "../../api/httpClient";

const module_name = "logs";

export const logsAdapter = createEntityAdapter({
  selectId: (model) => model.logId,
});

export const fetchLogs = createAsyncThunk(
  `${module_name}/getLogs`,
  async () => {
    const { data } = await httpClient.get("/api/log");
    return data;
  }
);

export const postLog = createAsyncThunk(
  `${module_name}/postLog`,
  async (data) => {
    const response = await httpClient.post("/api/log", data);
    return response.data;
  }
);

export const deleteLog = createAsyncThunk(
  `${module_name}/deleteLog`,
  async (id) => {
    const response = await httpClient.delete(`/api/log${id}`);
    return id;
  }
);

const logSlice = createSlice({
  name: "logs",
  initialState: logsAdapter.getInitialState({}),
  reducers: {},
  extraReducers: {
    [fetchLogs.pending]: (state) => {
      state.status = "loading";
    },
    [fetchLogs.fulfilled]: (state, { meta, payload }) => {
      logsAdapter.setAll(state, payload);
      state.status = "ok";
    },
    [postLog.fulfilled]: (state, { meta, payload }) => {
      logsAdapter.addOne(state, payload);
      state.status = "ok";
    },
  },
});

export const { actions } = logsAdapter;

export const { selectAll, selectById } = logsAdapter.getSelectors(
  (state) => state.logs
);

export default logSlice.reducer;
