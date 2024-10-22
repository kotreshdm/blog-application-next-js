import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { publicData } from "@/config/redux/selectors/publicDataSelectors";
import { updateCategories } from "@/config/redux/publicContent/publicDataSlice";
import apiService from "@/utils/api";
import Link from "next/link";
import { Box } from "@mui/material";

const CategoriesNavBar = () => {
  const { categories } = useSelector(publicData);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await apiService.get("/public/categories");
    dispatch(updateCategories(res.data));
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
      {categories.map((category) => (
        <Link
          href={`/blog?category=${category.name}`}
          key={category._id}
          style={{
            marginRight: "20px",
            color: "inherit",
            fontWeight: "bold",
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          <span>{category.name}</span>
        </Link>
      ))}
    </Box>
  );
};

export default CategoriesNavBar;
