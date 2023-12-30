import { createSlice } from "@reduxjs/toolkit";
import { createCategory } from "./CategoriesThunk";
import { RootState } from "../../app/store";

interface CategoryState {
  createCategoryLoading: boolean;
}

const initialState: CategoryState = {
  createCategoryLoading: false,
};

export const CategorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createCategory.pending, (state) => {
      state.createCategoryLoading = true;
    });
    builder.addCase(createCategory.fulfilled, (state) => {
      state.createCategoryLoading = false;
    });
    builder.addCase(createCategory.rejected, (state) => {
      state.createCategoryLoading = false;
    });
  },
});

export const CategoryReducer = CategorySlice.reducer;

export const selectCreateCategoryLoading = (state: RootState) =>
  state.category.createCategoryLoading;
