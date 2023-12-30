import React, { useState } from "react";
import { CategoryApi } from "../../types";
import ButtonSpinner from "../Spinners/ButtonSpinner";
import { Link } from "react-router-dom";

const initialState: CategoryApi = {
  name: "",
  type: "",
};

interface Props {
  onSubmit: (category: CategoryApi) => void;
  existingCategory?: CategoryApi;
  isEdit?: boolean;
  isLoading?: boolean;
}

const CategoriesForm: React.FC<Props> = ({
  onSubmit,
  existingCategory = initialState,
  isEdit = false,
  isLoading = false,
}) => {
  const [field, setField] = useState<CategoryApi>(existingCategory);

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

    onSubmit({
      ...field,
    });
  };

  return (
    <form onSubmit={onFormSubmit} className="col-6 shadow mx-auto p-4 mt-5">
      <h4>{isEdit ? "Edit category" : "Add new category"}</h4>
      <div className="form-group mb-4">
        <label htmlFor="type" className="form-label">
          Type
        </label>
        <select
          className="form-select"
          id="type"
          name="type"
          onChange={onChange}
          value={field.type}
          required
        >
          <option value="">Choose type</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
      </div>
      <div className="form-group mb-4">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={field.name}
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

export default CategoriesForm;
