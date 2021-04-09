import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./usersSlice";
import machinesReducer from "./machinesSlice";
import logsReducer from "./logsSlice";
import uiSlice from "./uiSlice";
import { signal } from "../signalr/index";
const rootReducer = combineReducers({
  users: userReducer,
  machines: machinesReducer,
  logs: logsReducer,
  ui: uiSlice,
});

export default configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(signal),
});
