import { configureStore } from "@reduxjs/toolkit";
import { CategoryReducer } from "../store/Categories/CategoriesSlice";
import { TransactionReducer } from "../store/Transaction/TransactionSlice";

export const store = configureStore({
  reducer: {
    category: CategoryReducer,
    transaction: TransactionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
