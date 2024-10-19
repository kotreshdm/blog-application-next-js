import {
  setLoading,
  updateCategories,
} from "../redux/categorySlice/categorySlice";

export const fetchCategories = async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await apiService.get("/categories", {});
    if (!response.status === 200) {
      throw new Error("Failed to fetch categories");
    }
    dispatch(updateCategories(response.data.categories));
  } catch (error) {
    console.error("Error fetching categories:", error);
  } finally {
    dispatch(setLoading(false));
  }
};
