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
  `${module_name}/fetchLogs`,
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

export const putLog = createAsyncThunk(
  `${module_name}/putLog`,
  async (data) => {
    const response = await httpClient.put(`/api/log/${data.logId}`, data);
    return response.data;
  }
);

export const deleteLog = createAsyncThunk(
  `${module_name}/deleteLog`,
  async (id) => {
    await httpClient.delete(`/api/log/${id}`);
    return id;
  }
);

export const postLogRequest = createAsyncThunk(
  `${module_name}/postLogRequest`,
  async (data) => {
    return await httpClient.post("/api/Request", data);
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
    [fetchLogs.fulfilled]: (state, { payload }) => {
      logsAdapter.setAll(state, payload);
      state.status = "ok";
    },
    [putLog.fulfilled]: (state, { payload }) => {
      const { logId, ...log } = payload;
      logsAdapter.updateOne(state, { id: logId, changes: { ...log } });
    },
    [postLog.fulfilled]: (state, { payload }) => {
      logsAdapter.addOne(state, payload);
      state.status = "ok";
    },
    [deleteLog.fulfilled]: (state, { meta, payload }) => {
      logsAdapter.removeOne(state, payload);
    },
    [postLogRequest.fulfilled]: () => {},
  },
});

export const { actions } = logsAdapter;

export const { selectAll, selectById } = logsAdapter.getSelectors(
  (state) => state.logs
);

export default logSlice.reducer;
