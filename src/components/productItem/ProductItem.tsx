import React, { useContext } from "react";
import Product from "../../types/product.types";
import CustomButton from "../custombutton/CustomButton";
import {
  ProductContainer,
  ProductImage,
  ProductInfo,
} from "./productItem.styles";
import { BsCart } from "react-icons/bs";
import { CartContext } from "../../contexts/CartContext";

interface ProductsItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductsItemProps> = ({ product }) => {
  const { addProductToCart } = useContext(CartContext);
  const handleAddProductToCart = () => {
    addProductToCart(product);
  };
  return (
    <ProductContainer>
      <ProductImage imageUrl={product.imageUrl}>
        <CustomButton
          startIcon={<BsCart size={25} />}
          onClick={handleAddProductToCart}
        >
          Add to the Cart
        </CustomButton>
      </ProductImage>
      <ProductInfo>
        <p>{product.name}</p>
        <p>₪ {product.price}</p>
      </ProductInfo>
    </ProductContainer>
  );
};

export default ProductItem;
