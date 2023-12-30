import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  CategoriesList,
  CategoryApi,
  CategoryProps,
  UpdateCategory,
} from "../../types";
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

export const editCategory = createAsyncThunk<void, UpdateCategory>(
  "category/edit",
  async ({ id, category }) => {
    await axiosApi.put(`categories/${id}.json`, category);
  }
);

export const fetchOneCategory = createAsyncThunk<CategoryApi, string>(
  "category/fetchCategory",
  async (id) => {
    const response = await axiosApi.get<CategoryApi | null>(
      `categories/${id}.json`
    );
    const category = response.data;

    if (category === null) {
      throw new Error("Not Found");
    }

    return category;
  }
);
