import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import httpClient from "../../api/httpClient";

const module_name = "machines";

export const machinesAdapter = createEntityAdapter({
  selectId: (model) => model.machineId,
});

export const fetchMachines = createAsyncThunk(
  `${module_name}/fetchMachines`,
  async () => {
    const response = await httpClient.get("/api/machine");
    return response.data;
  }
);

export const postMachine = createAsyncThunk(
  `${module_name}/postMachine`,
  async (data) => {
    const response = await httpClient.post("/api/machine", data);
    return data;
  }
);

export const putMachine = createAsyncThunk(
  `${module_name}/putMachine`,
  async (data) => {
    const response = await httpClient.put("/api/machine", data);
    return data;
  }
);

const machineSlice = createSlice({
  name: module_name,
  initialState: machinesAdapter.getInitialState({}),
  reducers: {},
  extraReducers: {
    [fetchMachines.fulfilled]: (state, { meta, payload }) => {
      machinesAdapter.setAll(state, payload);
    },
    [postMachine.fulfilled]: (state, { meta, payload }) => {
      machinesAdapter.addOne(state, payload);
    },
    [putMachine.fulfilled]: (state, { meta, payload }) => {
      machinesAdapter.updateOne(state, payload);
    },
  },
});

export const { actions } = machineSlice;

export const { selectAll, selectById } = machinesAdapter.getSelectors(
  (state) => state.machines
);

export default machineSlice.reducer;
