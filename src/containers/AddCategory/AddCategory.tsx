import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectCreateCategoryLoading } from "../../store/Categories/CategoriesSlice";
import { CategoryApi } from "../../types";
import { createCategory } from "../../store/Categories/CategoriesThunk";
import CategoriesForm from "../../components/CategoriesForm/CategoriesForm";

const AddCategory = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const createCategoryLoading = useAppSelector(selectCreateCategoryLoading);

  const onSubmit = async (category: CategoryApi) => {
    await dispatch(createCategory(category));
    navigate("/categories");
  };
  return (
    <>
      <CategoriesForm onSubmit={onSubmit} isLoading={createCategoryLoading} />
    </>
  );
};

export default AddCategory;
