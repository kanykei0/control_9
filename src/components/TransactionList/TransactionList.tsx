import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectAllTransactions,
  selectDeleteTransactionLoading,
  selectFetchAllTransactions,
} from "../../store/Transaction/TransactionSlice";
import {
  deleteTransaction,
  fetchAllTransactions,
} from "../../store/Transaction/TransactionThunk";
import TransactionItem from "./TransactionItem";
import { Spinner } from "react-bootstrap";

const TransactionList = () => {
  const dispatch = useAppDispatch();
  const transactionList = useAppSelector(selectAllTransactions);
  const transactionsLoading = useAppSelector(selectFetchAllTransactions);
  const deleteLoading = useAppSelector(selectDeleteTransactionLoading);

  useEffect(() => {
    void dispatch(fetchAllTransactions());
  }, [dispatch]);

  const removeTransaction = async (id: string) => {
    await dispatch(deleteTransaction(id));
    await dispatch(fetchAllTransactions());
  };
  const total = transactionList.reduce((total, transaction) => {
    const amount = parseFloat(transaction.amount);
    return transaction.type === "Income" ? total + amount : total - amount;
  }, 0);

  return (
    <>
      <div className="container mt-5">
        <div className="card shadow col-4">
          <div className="card-body">
            <h4>Total:{total} KGS</h4>
          </div>
        </div>

        {transactionsLoading ? (
          <Spinner />
        ) : (
          transactionList.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              onDelete={() => removeTransaction(transaction.id)}
              deleteLoading={deleteLoading}
              transaction={transaction}
            />
          ))
        )}
      </div>
    </>
  );
};

export default TransactionList;
