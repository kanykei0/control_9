import { createAsyncThunk } from "@reduxjs/toolkit";
import { TransactionConf } from "../../types";
import axiosApi from "../../axiosApi";

export const createTransaction = createAsyncThunk<void, TransactionConf>(
  "transaction/create",
  async (transaction) => {
    await axiosApi.post("transactions.json", transaction);
  }
);
