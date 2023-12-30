import React, { useEffect, useState } from "react";
import { TransactionConf, TransactionMutation } from "../../types";
import ButtonSpinner from "../Spinners/ButtonSpinner";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getCategoriesByType } from "../../store/Categories/CategoriesThunk";
import { selectTypedCategories } from "../../store/Categories/CategoriesSlice";

const initialState: TransactionMutation = {
  type: "",
  category: "",
  amount: "",
};

interface Props {
  onSubmit: (transaction: TransactionConf) => void;
  existingTransaction?: TransactionMutation;
  isEdit?: boolean;
  isLoading?: boolean;
}

const TransactionForm: React.FC<Props> = ({
  onSubmit,
  existingTransaction = initialState,
  isEdit = false,
  isLoading = false,
}) => {
  const dispatch = useAppDispatch();
  const typedCategories = useAppSelector(selectTypedCategories);
  const [field, setField] = useState<TransactionMutation>(existingTransaction);

  useEffect(() => {
    const typesData = async () => {
      await dispatch(getCategoriesByType(field.type));
    };
    void typesData();
  }, [dispatch, field.type]);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setField((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoading) return;
    const now = new Date();

    const createdAt = now.toISOString();

    onSubmit({
      category: field.category,
      amount: parseFloat(field.amount),
      createdAt: createdAt,
    });
  };

  return (
    <form onSubmit={onFormSubmit} className="col-6 shadow mx-auto p-4 mt-5">
      <h4>{isEdit ? "Edit transaction" : "Add new transaction"}</h4>
      <div className="form-group mb-4">
        <label htmlFor="type" className="form-label">
          Type
        </label>
        <select
          className="form-select"
          value={field.type}
          name="type"
          id="type"
          onChange={onChange}
          required
        >
          <option value="">Choose type</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
      </div>
      <div className="form-group mb-4">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select
          className="form-select"
          id="category"
          value={field.category}
          name="category"
          onChange={onChange}
          required
        >
          <option value="">Choose category</option>
          {typedCategories &&
            typedCategories.map((category, index) => (
              <option key={index} value={category.id}>
                {category.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group mb-4">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          type="number"
          className="form-control"
          id="amount"
          name="amount"
          value={field.amount}
          onChange={onChange}
          required
        />
      </div>
      <div className="mt-4">
        <button
          type="submit"
          className="btn btn-success me-3"
          disabled={isLoading}
        >
          {isLoading && <ButtonSpinner />}
          {isEdit ? "Update" : "Create"}
        </button>
        {!isLoading && (
          <Link to="/" className="btn btn-primary">
            Back
          </Link>
        )}
      </div>
    </form>
  );
};

export default TransactionForm;
