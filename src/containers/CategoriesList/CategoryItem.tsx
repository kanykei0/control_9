import React from "react";
import { CategoryProps } from "../../types";
import ButtonSpinner from "../../components/Spinners/ButtonSpinner";
import { Link } from "react-router-dom";

interface Props {
  category: CategoryProps;
  deleteLoading: boolean | string;
  onDelete: React.MouseEventHandler;
}

const CategoryItem: React.FC<Props> = ({
  category,
  deleteLoading,
  onDelete,
}) => {
  return (
    <div className="card shadow col-5 mx-auto mb-3">
      <div className="card-body d-flex align-items-center">
        <h6 className="m-0 me-5 ">{category.name}</h6>
        <p className={`m-0 me-5 ${category.type}`}>{category.type}</p>
        <Link
          to={`/edit-category/${category.id}`}
          className="btn btn-warning me-5"
        >
          edit
        </Link>
        <button
          className="btn btn-danger"
          onClick={onDelete}
          disabled={deleteLoading ? deleteLoading === category.id : false}
        >
          {deleteLoading && deleteLoading === category.id && <ButtonSpinner />}
          Delete
        </button>
      </div>
    </div>
  );
};

export default CategoryItem;
