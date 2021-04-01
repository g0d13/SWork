import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiLog } from "../api";

const logsInitialState = {
  logList: [],
  status: false,
  error: null,
};

export const getLogs = createAsyncThunk("logs/getLogs", async () => {
  return apiLog.getLogs();
});

const logSlice = createSlice({
  name: "logs",
  initialState: logsInitialState,
  reducers: {},
  extraReducers: {
    [getLogs.pending]: (state) => {
      state.status = "loading";
    },
    [getLogs.fulfilled]: (state, { meta, payload }) => {
      console.log(payload);
      state.logList = payload;
      state.status = "ok";
    },
  },
});

export default logSlice.reducer;
