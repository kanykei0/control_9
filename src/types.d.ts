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

export interface CategoryProps {
  id: string;
  name: string;
  type: string;
}

export type CategoryApi = Omit<CategoryProps, "id">;

// export interface CategoryMutation {
//   name: string;
//   type: string;
// }
