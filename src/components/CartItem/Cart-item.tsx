import React from "react";
import CartProduct from "../../types/cart.types";
import {
  CartItemContainer,
  CartItemImage,
  CartItemInfo,
  CartItemQuantity,
  RemoveButton,
} from "./CartItem";
import { AiOutlinePlus, AiOutlineMinus, AiOutlineClose } from "react-icons/ai";

interface CartItemProps {
  product: CartProduct;
}

const CartItem: React.FC<CartItemProps> = ({ product }) => {
  return (
    <CartItemContainer>
      <CartItemImage imageUrl={product.imageUrl} />
      <CartItemInfo>
        <p>{product.name}</p>
        <p>₪ {product.price}</p>
        <CartItemQuantity>
          <AiOutlineMinus size={20} />
          <p>{product.quantity}</p>
          <AiOutlinePlus size={20} />
        </CartItemQuantity>
      </CartItemInfo>
      <RemoveButton>
        <AiOutlineClose size={20} />
      </RemoveButton>
    </CartItemContainer>
  );
};

export default CartItem;
