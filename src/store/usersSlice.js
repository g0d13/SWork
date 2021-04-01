import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { apiUser } from "../api";

export const usersAdapter = createEntityAdapter({
  selectId: (user) => user.userId,
});

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  return apiUser.getUsers();
});

const usersSlice = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState({}),
  reducers: {},
  extraReducers: {
    [getUsers.fulfilled]: (state, { meta, payload }) => {
      usersAdapter.setAll(state, payload);
      state.status = "ok";
    },
    [getUsers.pending]: (state) => {
      state.status = "loading";
    },
  },
});

export const { actions } = usersSlice;

export const { selectById, selectAll } = usersAdapter.getSelectors(
  (state) => state.users
);

export default usersSlice.reducer;
