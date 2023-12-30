import { createSlice } from "@reduxjs/toolkit";

interface TransactionState {}

const initialState: TransactionState = {};

export const TransactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
});

export const TransactionReducer = TransactionSlice.reducer;
