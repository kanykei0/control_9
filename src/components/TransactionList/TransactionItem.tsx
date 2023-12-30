import React, { useEffect, useState } from "react";
import { CategoryProps, TransactionProps } from "../../types";
import ButtonSpinner from "../Spinners/ButtonSpinner";
import { Link } from "react-router-dom";
import axiosApi from "../../axiosApi";
import dayjs from "dayjs";

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

  let color;
  if (category && category.type === "income") {
    color = "text-success";
  } else if (category && category.type === "expense") {
    color = "text-danger";
  }

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
        <div className="col">
          <h6 className="m-0 me-5 ">
            {dayjs(transaction.createdAt).format("DD.MM.YYYY HH:mm:ss")}
          </h6>
          <div className={`m-0 fs-4 col-3 ${color}`}>
            {category && category.type === "Income" ? (
              <img
                src="https://cdn0.iconfinder.com/data/icons/ie_Bright/512/plus_add_green.png"
                alt=""
                style={{ width: "25px" }}
              />
            ) : category && category.type === "Expense" ? (
              <img
                src="https://kassalegko.ru/wp-content/uploads/2021/01/%D0%BE%D1%82%D1%80%D0%B8%D1%86%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5-%D0%BE%D1%81%D1%82%D0%B0%D1%82%D0%BA%D0%B8-%D1%8D%D0%B2%D0%BE%D1%82%D0%BE%D1%80.png"
                alt=""
                style={{ width: "25px" }}
              />
            ) : null}
            {transaction.amount} KGS
          </div>
          <p className="m-0">{category && category.name}</p>
        </div>
        <div className="col">
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
    </div>
  );
};

export default TransactionItem;
