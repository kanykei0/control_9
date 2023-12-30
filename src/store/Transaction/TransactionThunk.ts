import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  TransactionConf,
  TransactionList,
  TransactionProps,
} from "../../types";
import axiosApi from "../../axiosApi";

export const createTransaction = createAsyncThunk<void, TransactionConf>(
  "transaction/create",
  async (transaction) => {
    await axiosApi.post("transactions.json", transaction);
  }
);

export const fetchAllTransactions = createAsyncThunk<
  TransactionProps[],
  undefined
>("transaction/fetchAll", async () => {
  const response = await axiosApi.get<TransactionList | null>(
    "transactions.json"
  );
  const result = response.data;

  let newTransaction: TransactionProps[] = [];

  if (result) {
    newTransaction = Object.keys(result).map((key) => {
      const categories = result[key];
      return {
        ...categories,
        id: key,
      };
    });
  }

  return newTransaction;
});
