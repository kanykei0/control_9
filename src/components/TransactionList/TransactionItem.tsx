import React, { useEffect, useState } from "react";
import { CategoryProps, TransactionProps } from "../../types";
import ButtonSpinner from "../Spinners/ButtonSpinner";
import { Link } from "react-router-dom";
import axiosApi from "../../axiosApi";

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
  const [category, setCategory] = useState<CategoryProps | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axiosApi.get(
          `categories/${transaction.category}.json`
        );
        setCategory(response.data);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    fetchCategory();
  }, [transaction.category]);
  return (
    <div className="card shadow mx-auto mt-3">
      <div className="card-body d-flex align-items-center">
        <h6 className="m-0 me-5 ">{transaction.createdAt}</h6>
        <p className="m-0 me-5">{transaction.amount}</p>
        <p className="m-0">{category && category.name}</p>
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
