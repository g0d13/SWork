import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { apiLog } from "../api";
import usersSlice, { usersAdapter } from "./usersSlice";

export const logsAdapter = createEntityAdapter({
  selectId: (model) => model.logId,
});

export const getLogs = createAsyncThunk("logs/getLogs", async () => {
  return apiLog.getLogs();
});

const logSlice = createSlice({
  name: "logs",
  initialState: logsAdapter.getInitialState({}),
  reducers: {},
  extraReducers: {
    [getLogs.pending]: (state) => {
      state.status = "loading";
    },
    [getLogs.fulfilled]: (state, { meta, payload }) => {
      logsAdapter.setAll(state, payload);
      state.status = "ok";
    },
  },
});

export const { actions } = usersSlice;

export const { selectAll, selectById } = usersAdapter.getSelectors(
  (state) => state.logs
);

export default logSlice.reducer;
