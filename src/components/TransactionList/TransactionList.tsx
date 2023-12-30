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
    dispatch(fetchAllTransactions());
  }, [dispatch]);

  const removeTransaction = async (id: string) => {
    await dispatch(deleteTransaction(id));
    await dispatch(fetchAllTransactions());
  };

  return (
    <>
      <div className="container mt-5">
        <div className="card shadow col-4">
          <div className="card-body">
            <h4>Total: KGS</h4>
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
