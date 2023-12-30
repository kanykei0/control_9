import { createSlice } from "@reduxjs/toolkit";
import {
  createTransaction,
  deleteTransaction,
  fetchAllTransactions,
} from "./TransactionThunk";
import { RootState } from "../../app/store";
import { TransactionProps } from "../../types";

interface TransactionState {
  transactions: TransactionProps[];
  fetchTransactionsLoading: boolean;
  createTransactionLoading: boolean;
  deleteTransactionLoading: false | string;
}

const initialState: TransactionState = {
  transactions: [],
  fetchTransactionsLoading: false,
  createTransactionLoading: false,
  deleteTransactionLoading: false,
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
    builder.addCase(fetchAllTransactions.pending, (state) => {
      state.fetchTransactionsLoading = true;
    });
    builder.addCase(
      fetchAllTransactions.fulfilled,
      (state, { payload: transactions }) => {
        state.fetchTransactionsLoading = false;
        state.transactions = transactions;
      }
    );
    builder.addCase(fetchAllTransactions.rejected, (state) => {
      state.fetchTransactionsLoading = false;
    });
    builder.addCase(deleteTransaction.pending, (state, { meta }) => {
      state.deleteTransactionLoading = meta.arg;
    });
    builder.addCase(deleteTransaction.fulfilled, (state) => {
      state.deleteTransactionLoading = false;
    });
    builder.addCase(deleteTransaction.rejected, (state) => {
      state.deleteTransactionLoading = false;
    });
  },
});

export const TransactionReducer = TransactionSlice.reducer;

export const selectAllTransactions = (state: RootState) =>
  state.transaction.transactions;

export const selectCreateTransactionLoading = (state: RootState) =>
  state.transaction.createTransactionLoading;
export const selectFetchAllTransactions = (state: RootState) =>
  state.transaction.fetchTransactionsLoading;
export const selectDeleteTransactionLoading = (state: RootState) =>
  state.transaction.deleteTransactionLoading;
