import { createSlice } from "@reduxjs/toolkit";
import { createTransaction } from "./TransactionThunk";
import { RootState } from "../../app/store";

interface TransactionState {
  createTransactionLoading: boolean;
}

const initialState: TransactionState = {
  createTransactionLoading: false,
};

export const TransactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createTransaction.pending, (state) => {
      state.createTransactionLoading = true;
    });
    builder.addCase(createTransaction.fulfilled, (state) => {
      state.createTransactionLoading = false;
    });
    builder.addCase(createTransaction.rejected, (state) => {
      state.createTransactionLoading = false;
    });
  },
});

export const TransactionReducer = TransactionSlice.reducer;

export const selectCreateTransactionLoading = (state: RootState) =>
  state.transaction.createTransactionLoading;
