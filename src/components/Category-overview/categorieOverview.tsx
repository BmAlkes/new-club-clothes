import React from "react";
import Category from "../../types/category.types";
import ProductItem from "../productItem/ProductItem";
import {
  CategoryContainer,
  CategoryTitle,
  ProductsContainer,
} from "./categorieOvervie.styles";

interface CategoryOverviewProps {
  category: Category;
}

const CategoryOverview: React.FC<CategoryOverviewProps> = ({ category }) => {
  return (
    <CategoryContainer>
      <CategoryTitle>{category.displayName}</CategoryTitle>
      <ProductsContainer>
        {category.products.slice(0, 4).map((product) => (
          <ProductItem product={product} key={product.id} />
        ))}
      </ProductsContainer>
    </CategoryContainer>
  );
};

export default CategoryOverview;
