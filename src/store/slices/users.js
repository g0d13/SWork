import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import httpClient from "../../api/httpClient";

const module_name = "users";

export const usersAdapter = createEntityAdapter();

export const getUsers = createAsyncThunk(
  `${module_name}/getUsers`,
  async () => {
    const response = await httpClient.get("/api/users");
    return response.data;
  }
);

export const createUser = createAsyncThunk(
  `${module_name}/createUser`,
  async (user) => {
    const response = await httpClient.post("/api/Auth/Register", user);
    return response.data;
  }
);

export const updateUser = createAsyncThunk(
  `${module_name}/updateUser`,
  async (id, data) => {
    const response = await httpClient.put(`/api/users/${id}`, data);
    return response.data;
  }
);

export const deleteUser = createAsyncThunk(
  `${module_name}/deleteUser`,
  async (id) => {
    await httpClient.delete(`/api/users/${id}`);
    return id;
  }
);

const users = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState({
    status: "idle",
  }),
  reducers: {},
  extraReducers: {
    [getUsers.fulfilled]: (state, { payload }) => {
      usersAdapter.setAll(state, payload);
    },
    [createUser.fulfilled]: (state, { payload }) => {
      usersAdapter.addOne(state, payload);
      state.status = "ok";
    },
    [createUser.rejected]: (state) => {
      state.status = "error";
    },
    [deleteUser.fulfilled]: (state, { payload }) => {
      usersAdapter.removeOne(state, payload);
    },
  },
});

export const { actions } = users;

export const { selectById, selectAll } = usersAdapter.getSelectors(
  (state) => state.users
);

export default users.reducer;
