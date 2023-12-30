import React from "react";
import { TransactionProps } from "../../types";
import ButtonSpinner from "../Spinners/ButtonSpinner";
import { Link } from "react-router-dom";

interface Props {
  transaction: TransactionProps;
  deleteLoading: boolean | string;
  onDelete: React.MouseEventHandler;
}

const TransactionItem: React.FC<Props> = ({
  transaction,
  deleteLoading,
  onDelete,
}) => {
  return (
    <div className="card shadow mx-auto mt-3">
      <div className="card-body d-flex align-items-center">
        <h6 className="m-0 me-5 "></h6>
        <p className="m-0 me-5">{transaction.amount}</p>
        <Link
          to={`/edit-transaction/${transaction.id}`}
          className="btn btn-warning me-5"
        >
          edit
        </Link>
        <button
          className="btn btn-danger"
          onClick={onDelete}
          disabled={deleteLoading ? deleteLoading === transaction.id : false}
        >
          {deleteLoading && deleteLoading === transaction.id && (
            <ButtonSpinner />
          )}
          Delete
        </button>
      </div>
    </div>
  );
};

export default TransactionItem;
