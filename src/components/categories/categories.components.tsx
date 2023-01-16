import { useEffect, useState } from "react";
import axios from "axios";
//Utilities
import Category from "../../types/category.types";
import env from "../../config/env.config";

// styles
import "./categories.styles.css";
import CategorieItem from "../categorieItem/categorieItem";

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
  console.log(categories);

  return (
    <div className="categories-container">
      <div className="categories-content">
        {categories.map((category) => (
          <CategorieItem category={category} key={category.id} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
