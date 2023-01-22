import Category from "../types/category.types";
import { createContext, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase.config";
import { categoryConverter } from "../converter/firestore.converter";

interface ICategoryContext {
  categories: Category[];
  fetchCategories: () => Promise<void>;
  isLoading: boolean;
}

interface CategorieContextProps {
  children: React.ReactNode;
}

export const CategoryContext = createContext<ICategoryContext>({
  categories: [],
  fetchCategories: () => Promise.resolve(),
  isLoading: false,
});

const CategorieContextProvider: React.FC<CategorieContextProps> = ({
  children,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const categoriesFromFirestore: Category[] = [];
      const querySnapchot = await getDocs(
        collection(db, "categories").withConverter(categoryConverter)
      );
      const result = querySnapchot.forEach((doc) => {
        categoriesFromFirestore.push(doc.data());
      });
      setCategories(categoriesFromFirestore);
    } catch (error) {
      console.log({ error });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <CategoryContext.Provider
      value={{ categories, fetchCategories, isLoading }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategorieContextProvider;
