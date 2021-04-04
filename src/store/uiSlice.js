import { createSlice } from "@reduxjs/toolkit";

const uiInitialState = {
  title: "Inicio",
  shouldExit: false,
};

const slice = createSlice({
  name: "ui",
  initialState: uiInitialState,
  reducers: {
    modifyUiTitle: (state, action) => {
      state.title = action.payload;
    },
    toggleShouldExit: (state, action) => {
      state.shouldExit = action.payload;
    },
  },
  extraReducers: {},
});

export const { modifyUiTitle, toggleShouldExit } = slice.actions;

export default slice.reducer;
