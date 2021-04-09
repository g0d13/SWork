import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import userReducer from "./slices/users";
import machinesReducer from "./slices/machines";
import categoriesReducer from "./slices/categories";
import logsReducer from "./slices/logs";
import uiSlice from "./slices/ui";

import { signal } from "./helpers/signalr";

const rootReducer = combineReducers({
  users: userReducer,
  machines: machinesReducer,
  categories: categoriesReducer,
  logs: logsReducer,
  ui: uiSlice,
  auth: authReducer,
});

export default configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(signal),
});
