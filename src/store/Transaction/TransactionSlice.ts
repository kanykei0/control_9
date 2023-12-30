import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  createTransaction,
  deleteTransaction,
  editTransaction,
  fetchAllTransactions,
  fetchOneTransaction,
} from "./TransactionThunk";
import { RootState } from "../../app/store";
import { TransactionApi, TransactionProps } from "../../types";

interface TransactionState {
  transaction: TransactionApi | null;
  transactions: TransactionProps[];
  fetchTransactionsLoading: boolean;
  createTransactionLoading: boolean;
  deleteTransactionLoading: false | string;
  editTransactionLoading: boolean;
  oneTransactionLoading: boolean;
}

const initialState: TransactionState = {
  transaction: null,
  transactions: [],
  fetchTransactionsLoading: false,
  createTransactionLoading: false,
  deleteTransactionLoading: false,
  editTransactionLoading: false,
  oneTransactionLoading: false,
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
    builder.addCase(fetchOneTransaction.pending, (state) => {
      state.oneTransactionLoading = true;
    });
    builder.addCase(
      fetchOneTransaction.fulfilled,
      (
        state,
        { payload: transaction }: PayloadAction<TransactionApi | null>
      ) => {
        state.oneTransactionLoading = false;
        state.transaction = transaction;
      }
    );
    builder.addCase(fetchOneTransaction.rejected, (state) => {
      state.oneTransactionLoading = false;
    });
    builder.addCase(editTransaction.pending, (state) => {
      state.editTransactionLoading = true;
    });
    builder.addCase(editTransaction.fulfilled, (state) => {
      state.editTransactionLoading = false;
    });
    builder.addCase(editTransaction.rejected, (state) => {
      state.editTransactionLoading = false;
    });
  },
});

export const TransactionReducer = TransactionSlice.reducer;

export const selectTransaction = (state: RootState) =>
  state.transaction.transaction;
export const selectAllTransactions = (state: RootState) =>
  state.transaction.transactions;

export const selectCreateTransactionLoading = (state: RootState) =>
  state.transaction.createTransactionLoading;
export const selectFetchAllTransactions = (state: RootState) =>
  state.transaction.fetchTransactionsLoading;
export const selectDeleteTransactionLoading = (state: RootState) =>
  state.transaction.deleteTransactionLoading;
export const selectFetchOneTransactionLoading = (state: RootState) =>
  state.transaction.oneTransactionLoading;
export const selectEditTransactionLoading = (state: RootState) =>
  state.transaction.editTransactionLoading;
