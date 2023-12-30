export interface TransactionProps {
  id: string;
  type: string;
  category: string;
  amount: number;
}

export type TransactionApi = Omit<TransactionProps, "id">;

export interface TransactionMutation {
  type: string;
  category: string;
  amount: string;
}

export interface TransactionConf {
  category: string;
  amount: number;
  createdAt: string;
}

export interface TransactionList {
  [id: string]: TransactionApi;
}

export interface CategoryProps {
  id: string;
  name: string;
  type: string;
}

export type CategoryApi = Omit<CategoryProps, "id">;

export interface CategoriesList {
  [id: string]: CategoryApi;
}

export interface UpdateCategory {
  id: string;
  category: CategoryApi;
}
