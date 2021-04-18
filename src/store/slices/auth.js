import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "../../api/httpClient";
import { connection } from "../helpers/signalr";

const module_name = "auth";

const initialState = {
  jwt: "",
  status: "no_logging",
  message: "",
  user: {
    firstName: "",
    email: "",
    role: "",
    id: "",
  },
};

export const doLogin = createAsyncThunk(
  `${module_name}/doLogin`,
  async (data) => {
    const response = await httpClient.post("/api/Auth/Login", data);
    const token = response.data.token;
    httpClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    connection.invoke("OnConnectionReady", response.data.id).catch(() => {});
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
    getUserData: (state) => {
      const { jwt, ...user } = JSON.parse(window.localStorage.getItem("user"));
      state.jwt = jwt;
      state.user = user;
    },
  },
  extraReducers: {
    [doLogin.fulfilled]: (state, { payload }) => {
      let { token, ...user } = payload.data;
      state.jwt = token;
      state.user = user;
      state.message = "Inicio de sesion correcto";
      window.localStorage.setItem("user", JSON.stringify(payload.data));
    },
    [doLogin.pending]: (state) => {
      state.message = "cargando...";
    },
    [doLogin.rejected]: (state, action) => {
      state.message = action.error.message;
    },
  },
});

export const { actions } = auth;
export const { getUserData } = auth.actions;

export default auth.reducer;
