import { createSlice } from "@reduxjs/toolkit";

interface CategoryState {}

const initialState: CategoryState = {};

export const CategorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
});

export const CategoryReducer = CategorySlice.reducer;
