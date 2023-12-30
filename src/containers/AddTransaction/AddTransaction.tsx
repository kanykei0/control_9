import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectCreateTransactionLoading } from "../../store/Transaction/TransactionSlice";
import { TransactionApi } from "../../types";
import { createTransaction } from "../../store/Transaction/TransactionThunk";
import TransactionForm from "../../components/TransactionForm/TransactionForm";

const AddNewTransaction = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const createTrnsactionLoading = useAppSelector(
    selectCreateTransactionLoading
  );

  const onSubmit = async (transaction: TransactionApi) => {
    await dispatch(createTransaction(transaction));
    navigate("/");
  };

  return (
    <>
      <TransactionForm
        onSubmit={onSubmit}
        isLoading={createTrnsactionLoading}
      />
    </>
  );
};

export default AddNewTransaction;
