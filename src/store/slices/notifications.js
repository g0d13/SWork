import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import httpClient from "../../api/httpClient";

const module_name = "notifications";

const notificationsAdapter = createEntityAdapter();

export const fetchNotifications = createAsyncThunk(
  `${module_name}/fetchNotifications`,
  async () => {
    let notifications;
    const requestNotif = await httpClient.get("/api/Request");
    const repairNotif = await httpClient.get("/api/Repair");
    notifications = [...requestNotif.data, ...repairNotif.data];
    return notifications;
  }
);

const notifications = createSlice({
  name: module_name,
  initialState: notificationsAdapter.getInitialState(),
  extraReducers: {
    [fetchNotifications.fulfilled]: (state, action) => {
      notificationsAdapter.setAll(state, action.payload);
    },
  },
});

export const { selectAll, selectById } = notificationsAdapter.getSelectors(
  (state) => state.notifications
);

export default notifications.reducer;
