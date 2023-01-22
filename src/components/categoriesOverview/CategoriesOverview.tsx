import React, { useContext, useEffect } from "react";
import { CategoryContext } from "../../contexts/CategorieContext";
import CategoryOverview from "../Category-overview/categorieOverview";
import Loading from "../loading/Loading.component";
import { Container } from "./CategoriesOverview.styles";

const CategoriesOverview = () => {
  const { categories, fetchCategories, isLoading } =
    useContext(CategoryContext);

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
  }, []);

  if (isLoading) return <Loading />;
  return (
    <Container>
      {categories.map((category) => (
        <CategoryOverview key={category.id} category={category} />
      ))}
    </Container>
  );
};

export default CategoriesOverview;
