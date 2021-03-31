import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiUser } from "../api";

const userInitialState = {
  userList: [],
  status: false,
  error: null,
};

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  return apiUser.getUsers();
});

const usersSlice = createSlice({
  name: "users",
  initialState: userInitialState,
  reducers: {},
  extraReducers: {
    [getUsers.fulfilled]: (state, { meta, payload }) => {
      state.userList = payload;
    },
    [getUsers.pending]: (state) => {
      state.status = "loading";
    },
  },
});

// export const {} = usersSlice.actions;

export default usersSlice.reducer;
