import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import httpClient from "../../api/httpClient";

export const usersAdapter = createEntityAdapter();

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (_, { getState, signal, extra }) => {
    const response = await httpClient.get("/api/users");
    return response.data;
  }
);

export const createUser = createAsyncThunk("users/createUser", async (user) => {
  const response = await httpClient.post("/api/Auth/Register", user);
  return response.data;
});

export const updateUser = createAsyncThunk("users/updateUser", async (id) => {
  const response = await httpClient.put(`/api/users/${id}`);
  return response.data;
});

const users = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState({
    status: "idle",
  }),
  reducers: {},
  extraReducers: {
    [getUsers.fulfilled]: (state, { meta, payload }) => {
      usersAdapter.setAll(state, payload);
    },
    [createUser.fulfilled]: (state, payload) => {
      state.status = "ok";
    },
    [createUser.rejected]: (state, payload) => {
      state.status = "error";
    },
  },
});

export const { actions } = users;

export const { selectById, selectAll } = usersAdapter.getSelectors(
  (state) => state.users
);

export default users.reducer;
