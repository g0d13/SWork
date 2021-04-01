import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./usersSlice";
import logsSlice from "./logsSlice";
import uiSlice from "./uiSlice";

const rootReducer = combineReducers({
  users: userReducer,
  logs: logsSlice,
  ui: uiSlice,
});

export default configureStore({ reducer: rootReducer, devTools: true });
