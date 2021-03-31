import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./usersSlice";
import logsSlice from "./logsSlice";

const rootReducer = combineReducers({
  users: userReducer,
  logs: logsSlice,
});

export default configureStore({
  reducer: rootReducer,
});
