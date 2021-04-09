import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "../../api/httpClient";

const module_name = "auth";

const initialState = {
  jwt: "",
  status: "no_logging",
  user: {
    firstName: "",
    email: "",
    role: "",
  },
};

export const doLogin = createAsyncThunk(
  `${module_name}/doLogin`,
  async (data) => {
    const response = await httpClient.post("/api/Auth/Login", data);
    const token = response.data.token;
    httpClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    return response;
  }
);

export const refreshToken = createAsyncThunk(
  `${module_name}/refreshToken`,
  async () => {
    const response = httpClient.post(
      "/api/Auth/RefreshToken",
      {},
      { withCredentials: true }
    );
    httpClient.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${response.data.token}`;
    return response.data;
  }
);

const auth = createSlice({
  name: module_name,
  initialState: initialState,
  reducers: {
    isLoggedUser: (state) => !!!state.jwt,
  },
  extraReducers: {
    [doLogin.fulfilled]: (state, { meta, payload }) => {
      let { token, ...user } = payload.data;
      state.jwt = token;
      state.user = user;
      state.status = "ok";
    },
    [doLogin.pending]: (state, { meta, payload }) => {
      state.status = "pending";
    },
    [doLogin.rejected]: (state, { meta, payload }) => {
      state.status = "usuario o contrasenia invalidos";
    },
  },
});

export const { actions } = auth;

export default auth.reducer;
