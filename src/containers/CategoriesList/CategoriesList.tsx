import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectDeleteCategoryLoading,
  selectFetchAllCategoriesLoading,
  slelectAllCategories,
} from "../../store/Categories/CategoriesSlice";
import {
  deleteCategory,
  fetchAllCategories,
} from "../../store/Categories/CategoriesThunk";
import Spinner from "../../components/Spinners/Spinner";
import CategoryItem from "./CategoryItem";
import { Link } from "react-router-dom";

const CategoriesList = () => {
  const dispatch = useAppDispatch();
  const categoriesList = useAppSelector(slelectAllCategories);
  const categoriesLoading = useAppSelector(selectFetchAllCategoriesLoading);
  const deleteLoading = useAppSelector(selectDeleteCategoryLoading);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const removeCategory = async (id: string) => {
    await dispatch(deleteCategory(id));
    await dispatch(fetchAllCategories());
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h4>Categories:</h4>
        <Link to="/add-category" className="btn btn-dark">
          New category
        </Link>
      </div>

      {categoriesLoading ? (
        <Spinner />
      ) : (
        categoriesList.map((category) => (
          <CategoryItem
            key={category.id}
            onDelete={() => removeCategory(category.id)}
            deleteLoading={deleteLoading}
            category={category}
          />
        ))
      )}
    </div>
  );
};

export default CategoriesList;
