import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase.config";
import { categoryConverter } from "../../converter/firestore.converter";
import Category from "../../types/category.types";
import Loading from "../loading/Loading.component";
import { BiChevronLeft } from "react-icons/bi";
import {
  Container,
  IconContainer,
  CategoryTitle,
  ProductsContainer,
} from "./CategoryDetails.style";
import ProductItem from "../productItem/ProductItem";
import { useNavigate } from "react-router-dom";

interface CategoryDetailsProps {
  categoryId: string;
}

const CategoryDetails: React.FC<CategoryDetailsProps> = ({ categoryId }) => {
  const navigate = useNavigate();
  const [category, setCategory] = useState<Category | null>(null);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(
          query(
            collection(db, "categories").withConverter(categoryConverter),
            where("id", "==", categoryId)
          )
        );
        const category = querySnapshot.docs[0]?.data();
        setCategory(category);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, []);
  if (isLoading) return <Loading />;
  return (
    <Container>
      <CategoryTitle>
        <IconContainer onClick={() => navigate("/")}>
          <BiChevronLeft size={36} />
        </IconContainer>
        <p>Explorer {category?.displayName}</p>
      </CategoryTitle>
      <ProductsContainer>
        {category?.products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </ProductsContainer>
    </Container>
  );
};

export default CategoryDetails;
