import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import httpClient from "../api/httpClient";

const module_name = "categories";

export const categoriesAdapter = createEntityAdapter({
  selectId: (model) => model.categoryId,
});

export const fetchCategories = createAsyncThunk(
  `${module_name}/fetchCategories`,
  async () => {
    const response = await httpClient.get("/api/category");
    return response.data;
  }
);

const slice = createSlice({
  name: module_name,
  initialState: categoriesAdapter.getInitialState({}),
  reducers: {},
  extraReducers: {
    [fetchCategories.fulfilled]: (state, { meta, payload }) => {
      fetchCategories.setAll(state, payload);
    },
  },
});

export const { actions } = slice;

export const { selectAll, selectById } = categoriesAdapter.getSelectors(
  (state) => state.categories
);

export default slice.reducer;
