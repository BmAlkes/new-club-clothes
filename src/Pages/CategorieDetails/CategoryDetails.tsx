import React from "react";
import { useParams } from "react-router-dom";
import CategoryDetails from "../../components/CategoryDetails/CategoryDetail";
import Header from "../../components/header/header.components";

const CategoryDetailsPage = () => {
  const { id } = useParams();
  if (!id) return null;
  return (
    <>
      <Header />
      <CategoryDetails categoryId={id} />
    </>
  );
};

export default CategoryDetailsPage;
