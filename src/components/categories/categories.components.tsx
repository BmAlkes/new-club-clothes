import { useEffect, useState } from "react";
import axios from "axios";

// Components
import CategoryItem from "../categorieItem/categorieItem";

//Utilities
import Category from "../../types/category.types";
import env from "../../config/env.config";

// styles
import { CategoriesContainer, CategoriesContent } from "./categories.styles";

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const fetchCategory = async () => {
    try {
      const { data } = await axios.get(`${env.apiUrl}api/category`);
      setCategories(data);
    } catch (error) {
      console.log({ error });
    }
  };
  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <CategoriesContainer>
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
