import { createAsyncThunk } from "@reduxjs/toolkit";
import { CategoryApi } from "../../types";
import axiosApi from "../../axiosApi";

export const createCategory = createAsyncThunk<void, CategoryApi>(
  "category/create",
  async (category) => {
    await axiosApi.post("categories.json", category);
  }
);
