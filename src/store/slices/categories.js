import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import httpClient from "../../api/httpClient";

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

export const postCategory = createAsyncThunk(
  `${module_name}/postCategory`,
  async (data) => {
    const response = await httpClient.post("/api/category", data);
    return response.data;
  }
);

export const putCategory = createAsyncThunk(
  `${module_name}/putCategory`,
  async (data) => {
    await httpClient.put(`/api/category/${data.categoryId}`, data);
    return data;
  }
);

const slice = createSlice({
  name: module_name,
  initialState: categoriesAdapter.getInitialState({}),
  reducers: {},
  extraReducers: {
    [fetchCategories.fulfilled]: (state, { payload }) => {
      categoriesAdapter.setAll(state, payload);
    },
    [postCategory.fulfilled]: (state, { payload }) => {
      categoriesAdapter.addOne(state, payload);
    },
    [putCategory.fulfilled]: (state, { payload }) => {
      const { categoryId, ...category } = payload;
      categoriesAdapter.updateOne(state, {
        id: categoryId,
        changes: { ...category },
      });
    },
  },
});

export const { actions } = slice;

export const { selectAll, selectById } = categoriesAdapter.getSelectors(
  (state) => state.categories
);

export default slice.reducer;
