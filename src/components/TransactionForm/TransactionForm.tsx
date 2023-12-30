import React, { useState } from "react";
import { TransactionApi, TransactionMutation } from "../../types";
import ButtonSpinner from "../Spinners/ButtonSpinner";
import { Link } from "react-router-dom";

const initialState: TransactionMutation = {
  type: "",
  category: "",
  amount: "",
};

interface Props {
  onSubmit: (transaction: TransactionApi) => void;
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
  const [field, setField] = useState<TransactionMutation>(existingTransaction);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setField((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoading) return;

    onSubmit({
      ...field,
      amount: parseFloat(field.amount),
    });
  };
  return (
    <form onSubmit={onFormSubmit} className="col-6 shadow mx-auto p-4 mt-5">
      <h4>{isEdit ? "Edit transaction" : "Add new transaction"}</h4>
      <div className="form-group mb-4">
        <label htmlFor="type" className="form-label">
          Type
        </label>
        <select className="form-select" id="type" required>
          <option value="">Choose type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      <div className="form-group mb-4">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select className="form-select" id="category" required>
          <option value="">Choose category</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      <div className="form-group mb-4">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          type="text"
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
