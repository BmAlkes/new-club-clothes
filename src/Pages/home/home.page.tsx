import { BrowserRouter, Routes, Route } from "react-router-dom";
import Categories from "../../components/categories/categories.components";
//Components

import Header from "../../components/header/header.components";

const Home = () => {
  return (
    <>
      <Header />
      <Categories />
    </>
  );
};

export default Home;
