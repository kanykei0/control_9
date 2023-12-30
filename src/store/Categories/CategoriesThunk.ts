import { createAsyncThunk } from "@reduxjs/toolkit";
import { CategoriesList, CategoryApi, CategoryProps } from "../../types";
import axiosApi from "../../axiosApi";

export const createCategory = createAsyncThunk<void, CategoryApi>(
  "category/create",
  async (category) => {
    await axiosApi.post("categories.json", category);
  }
);

export const fetchAllCategories = createAsyncThunk<CategoryProps[], undefined>(
  "category/fetchAll",
  async () => {
    const response = await axiosApi.get<CategoriesList | null>(
      "categories.json"
    );
    const category = response.data;

    let newCategory: CategoryProps[] = [];

    if (category) {
      newCategory = Object.keys(category).map((key) => {
        const categories = category[key];
        return {
          ...categories,
          id: key,
        };
      });
    }

    return newCategory;
  }
);

export const deleteCategory = createAsyncThunk<void, string>(
  "category/delete",
  async (id: string) => {
    await axiosApi.delete(`categories/${id}.json`);
  }
);
