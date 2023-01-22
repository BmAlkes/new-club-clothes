import { useContext, useEffect, useState } from "react";

// Components
import CategoryItem from "../categorieItem/categorieItem";
import Loading from "../loading/Loading.component";

// styles
import { CategoriesContainer, CategoriesContent } from "./categories.styles";
import { CategoryContext } from "../../contexts/CategorieContext";

const Categories = () => {
  const { categories, fetchCategories, isLoading } =
    useContext(CategoryContext);
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoriesContainer>
      {isLoading && <Loading />}
      <CategoriesContent>
        {categories.map((category) => (
          <div key={category.id}>
            <CategoryItem category={category} />
          </div>
        ))}
      </CategoriesContent>
    </CategoriesContainer>
  );
};

export default Categories;
