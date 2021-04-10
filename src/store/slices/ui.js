import { createSlice } from "@reduxjs/toolkit";

const uiInitialState = {
  title: "Inicio",
  actions: [],
  shouldExit: false,
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
  },
  extraReducers: {},
});

export const { modifyUiTitle, modifyActions, toggleShouldExit } = slice.actions;

export default slice.reducer;
