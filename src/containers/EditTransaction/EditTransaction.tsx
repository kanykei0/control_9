// import { useNavigate, useParams } from "react-router-dom";
// import { useAppDispatch, useAppSelector } from "../../app/hooks";
// import {
//   selectEditTransactionLoading,
//   selectFetchOneTransactionLoading,
//   selectTransaction,
// } from "../../store/Transaction/TransactionSlice";
// import { useEffect } from "react";
// import {
//   editTransaction,
//   fetchOneTransaction,
// } from "../../store/Transaction/TransactionThunk";
// import { TransactionConf } from "../../types";
// import TransactionForm from "../../components/TransactionForm/TransactionForm";
// import { Spinner } from "react-bootstrap";

// const EditTransaction = () => {
//   const { id } = useParams() as { id: string };
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
//   const transaction = useAppSelector(selectTransaction);
//   const oneTransactionLoading = useAppSelector(
//     selectFetchOneTransactionLoading
//   );
//   const editTransactionLoading = useAppSelector(selectEditTransactionLoading);

//   useEffect(() => {
//     dispatch(fetchOneTransaction(id));
//   }, [dispatch]);

//   const onSubmit = async (transaction: TransactionConf) => {
//     await dispatch(editTransaction({ id, transaction }));
//     navigate("/");
//   };
//   console.log(transaction);
//   const existingTransaction = transaction
//     ? {
//         ...transaction,
//         amount: transaction.amount.toString(),
//       }
//     : undefined;

//   let formBlock = <Spinner />;

//   if (!oneTransactionLoading) {
//     if (transaction) {
//       formBlock = (
//         <TransactionForm
//           isEdit
//           onSubmit={onSubmit}
//           isLoading={editTransactionLoading}
//           existingTransaction={existingTransaction}
//         />
//       );
//     } else {
//       formBlock = <h4>Not found</h4>;
//     }
//   }

//   return (
//     <>
//       <div>{formBlock}</div>
//     </>
//   );
// };

// export default EditTransaction;
