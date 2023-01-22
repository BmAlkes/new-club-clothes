import React from "react";
import Product from "../../types/product.types";
import {
  ProductContainer,
  ProductImage,
  ProductInfo,
} from "./productItem.styles";

interface ProductsItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductsItemProps> = ({ product }) => {
  return (
    <ProductContainer>
      <ProductImage imageUrl={product.imageUrl} />
      <ProductInfo>
        <p>{product.name}</p>
        <p>₪ {product.price}</p>
      </ProductInfo>
    </ProductContainer>
  );
};

export default ProductItem;
