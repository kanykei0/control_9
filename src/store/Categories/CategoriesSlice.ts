import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  createCategory,
  deleteCategory,
  editCategory,
  fetchAllCategories,
  fetchOneCategory,
  getCategoriesByType,
} from "./CategoriesThunk";
import { RootState } from "../../app/store";
import { CategoryApi, CategoryProps } from "../../types";

interface CategoryState {
  category: CategoryApi | null;
  categories: CategoryProps[];
  categoriesTyped: CategoryProps[];
  createCategoryLoading: boolean;
  fetchCatgoriesLoading: boolean;
  editCategoryLoading: boolean;
  oneCategoryLoading: boolean;
  typedCategoriesLoading: boolean;
  deleteCategoryLoading: false | string;
}

const initialState: CategoryState = {
  category: null,
  categories: [],
  categoriesTyped: [],
  createCategoryLoading: false,
  fetchCatgoriesLoading: false,
  editCategoryLoading: false,
  oneCategoryLoading: false,
  typedCategoriesLoading: false,
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
    builder.addCase(editCategory.pending, (state) => {
      state.editCategoryLoading = true;
    });
    builder.addCase(editCategory.fulfilled, (state) => {
      state.editCategoryLoading = false;
    });
    builder.addCase(editCategory.rejected, (state) => {
      state.editCategoryLoading = false;
    });
    builder.addCase(fetchOneCategory.pending, (state) => {
      state.oneCategoryLoading = true;
    });
    builder.addCase(
      fetchOneCategory.fulfilled,
      (state, { payload: category }: PayloadAction<CategoryApi | null>) => {
        state.oneCategoryLoading = false;
        state.category = category;
      }
    );
    builder.addCase(fetchOneCategory.rejected, (state) => {
      state.oneCategoryLoading = false;
    });
    builder.addCase(getCategoriesByType.pending, (state) => {
      state.typedCategoriesLoading = true;
    });
    builder.addCase(
      getCategoriesByType.fulfilled,
      (state, { payload: categoriesTyped }) => {
        state.typedCategoriesLoading = false;
        state.categoriesTyped = categoriesTyped;
      }
    );
    builder.addCase(getCategoriesByType.rejected, (state) => {
      state.typedCategoriesLoading = false;
    });
  },
});

export const CategoryReducer = CategorySlice.reducer;

export const selectTypedCategories = (state: RootState) =>
  state.category.categoriesTyped;
export const selectCategory = (state: RootState) => state.category.category;
export const slelectAllCategories = (state: RootState) =>
  state.category.categories;

export const selectCreateCategoryLoading = (state: RootState) =>
  state.category.createCategoryLoading;
export const selectFetchAllCategoriesLoading = (state: RootState) =>
  state.category.fetchCatgoriesLoading;
export const selectDeleteCategoryLoading = (state: RootState) =>
  state.category.deleteCategoryLoading;
export const selectEditCategoryLoading = (state: RootState) =>
  state.category.editCategoryLoading;
export const selectFetchOneCategoryLoading = (state: RootState) =>
  state.category.oneCategoryLoading;
