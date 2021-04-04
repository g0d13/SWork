import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

const module_name = "machines";

export const machinesAdapter = createEntityAdapter({
  selectId: (model) => model.machineId,
});

export const fetchMachines = createAsyncThunk(
  `${module_name}/fetchMachines`,
  async () => {}
);

const machineSlice = createSlice({
  name: module_name,
  initialState: machinesAdapter.getInitialState({}),
  reducers: {},
  extraReducers: {},
});

export const { actions } = machineSlice;

export const { selectAll, selectById } = machineSlice.getSelectors(
  (state) => state.logs
);

export default machineSlice.reducer;
