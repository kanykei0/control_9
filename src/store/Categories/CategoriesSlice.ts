import { createSlice } from "@reduxjs/toolkit";
import {
  createCategory,
  deleteCategory,
  fetchAllCategories,
} from "./CategoriesThunk";
import { RootState } from "../../app/store";
import { CategoryProps } from "../../types";

interface CategoryState {
  categories: CategoryProps[];
  createCategoryLoading: boolean;
  fetchCatgoriesLoading: boolean;
  deleteCategoryLoading: false | string;
}

const initialState: CategoryState = {
  categories: [],
  createCategoryLoading: false,
  fetchCatgoriesLoading: false,
  deleteCategoryLoading: false,
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
    builder.addCase(fetchAllCategories.pending, (state) => {
      state.fetchCatgoriesLoading = true;
    });
    builder.addCase(
      fetchAllCategories.fulfilled,
      (state, { payload: categories }) => {
        state.fetchCatgoriesLoading = false;
        state.categories = categories;
      }
    );
    builder.addCase(fetchAllCategories.rejected, (state) => {
      state.fetchCatgoriesLoading = false;
    });
    builder.addCase(deleteCategory.pending, (state, { meta }) => {
      state.deleteCategoryLoading = meta.arg;
    });
    builder.addCase(deleteCategory.fulfilled, (state) => {
      state.deleteCategoryLoading = false;
    });
    builder.addCase(deleteCategory.rejected, (state) => {
      state.deleteCategoryLoading = false;
    });
  },
});

export const CategoryReducer = CategorySlice.reducer;

export const slelectAllCategories = (state: RootState) =>
  state.category.categories;

export const selectCreateCategoryLoading = (state: RootState) =>
  state.category.createCategoryLoading;
export const selectFetchAllCategoriesLoading = (state: RootState) =>
  state.category.fetchCatgoriesLoading;
export const selectDeleteCategoryLoading = (state: RootState) =>
  state.category.deleteCategoryLoading;
