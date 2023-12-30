import { createAsyncThunk } from "@reduxjs/toolkit";
import { TransactionApi } from "../../types";
import axiosApi from "../../axiosApi";

export const createTransaction = createAsyncThunk<void, TransactionApi>(
  "transaction/create",
  async (transaction) => {
    await axiosApi.post("transactions.json", transaction);
  }
);
