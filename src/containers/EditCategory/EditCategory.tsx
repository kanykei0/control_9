import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectCategory,
  selectEditCategoryLoading,
  selectFetchOneCategoryLoading,
} from "../../store/Categories/CategoriesSlice";
import { useEffect } from "react";
import {
  editCategory,
  fetchOneCategory,
} from "../../store/Categories/CategoriesThunk";
import { CategoryApi } from "../../types";
import { Spinner } from "react-bootstrap";
import CategoriesForm from "../../components/CategoriesForm/CategoriesForm";

const EditCategory = () => {
  const { id } = useParams() as { id: string };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const category = useAppSelector(selectCategory);
  const oneCategoryLoading = useAppSelector(selectFetchOneCategoryLoading);
  const editCategoryLoading = useAppSelector(selectEditCategoryLoading);

  useEffect(() => {
    dispatch(fetchOneCategory(id));
  }, [dispatch, id]);

  const onSubmit = async (category: CategoryApi) => {
    await dispatch(editCategory({ id, category }));
    navigate("/categories");
  };

  const existingCategory = category ? { ...category } : undefined;

  let formBlock = <Spinner />;

  if (!oneCategoryLoading) {
    if (category) {
      formBlock = (
        <CategoriesForm
          isEdit
          onSubmit={onSubmit}
          isLoading={editCategoryLoading}
          existingCategory={existingCategory}
        />
      );
    } else {
      formBlock = <h4>Not found</h4>;
    }
  }

  return (
    <div className="container">
      <div>{formBlock}</div>
    </div>
  );
};

export default EditCategory;
