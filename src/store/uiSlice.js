import { createSlice } from "@reduxjs/toolkit";

const uiInitialState = {
  title: "Inicio",
  shouldExit: false,
};

const slice = createSlice({
  name: "ui",
  initialState: uiInitialState,
  reducers: {
    modifyTitle: (state, action) => {
      state.title = action;
    },
    toggleShouldExit: (state, action) => {
      state.shouldExit = action;
    },
  },
  extraReducers: {},
});

export const { modifyTitle, toggleShouldExit } = slice.actions;

export default slice.reducer;
