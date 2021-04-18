import { createSlice } from "@reduxjs/toolkit";

const uiInitialState = {
  title: "Inicio",
  actions: [],
  shouldExit: false,
  notifications: [],
  openDrawer: false,
};

const slice = createSlice({
  name: "ui",
  initialState: uiInitialState,
  reducers: {
    modifyUiTitle: (state, action) => {
      state.title = action.payload;
    },
    modifyActions: (state, action) => {
      state.actions = action.payload;
    },
    toggleShouldExit: (state, action) => {
      state.shouldExit = action.payload;
    },
    toggleDrawer: (state, action) => {
      state.openDrawer = action.payload;
    },
    enqueueSnackbar: (state, { payload }) => {
      state.notifications = [...state.notifications, payload];
    },
    removeSnackbar: (state, action) => {
      state.notifications = state.notifications.filter(
        (n) => n.key !== action.payload
      );
    },
    closeSnackbar: (state, action) => {
      state.notifications = state.notifications.map((notification) => {
        if (action.payload.dismissAll || notification.key === action.payload) {
          return { ...notification, dismissed: true };
        }
        return notification;
      });
    },
  },
  extraReducers: {},
});

export const {
  modifyUiTitle,
  modifyActions,
  toggleShouldExit,
  enqueueSnackbar,
  removeSnackbar,
  closeSnackbar,
  toggleDrawer,
} = slice.actions;

export default slice.reducer;
