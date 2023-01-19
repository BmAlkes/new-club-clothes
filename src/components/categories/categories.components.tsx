import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase.config";

// Components
import CategoryItem from "../categorieItem/categorieItem";

//Utilities
import Category from "../../types/category.types";

// styles
import { CategoriesContainer, CategoriesContent } from "./categories.styles";

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const fetchCategory = async () => {
    try {
      const categoriesFromFirestore: Category[] = [];
      const querySnapchot = await getDocs(collection(db, "categories"));
      const result = querySnapchot.forEach((doc: any) => {
        categoriesFromFirestore.push(doc.data());
      });
      setCategories(categoriesFromFirestore);
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
