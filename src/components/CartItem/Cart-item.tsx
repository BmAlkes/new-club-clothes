import React, { useContext } from "react";
import CartProduct from "../../types/cart.types";
import {
  CartItemContainer,
  CartItemImage,
  CartItemInfo,
  CartItemQuantity,
  RemoveButton,
} from "./CartItem";
import { AiOutlinePlus, AiOutlineMinus, AiOutlineClose } from "react-icons/ai";
import { CartContext } from "../../contexts/CartContext";

interface CartItemProps {
  product: CartProduct;
}

const CartItem: React.FC<CartItemProps> = ({ product }) => {
  const {
    removeProductFromCart,
    increaseProductQuantity,
    decreaseProductQuantity,
  } = useContext(CartContext);
  const handleRemoveClick = () => {
    removeProductFromCart(product.id);
  };

  const handleIncrease = () => {
    increaseProductQuantity(product.id);
  };
  const handleDecrease = () => {
    decreaseProductQuantity(product.id);
  };
  return (
    <CartItemContainer>
      <CartItemImage imageUrl={product.imageUrl} />
      <CartItemInfo>
        <p>{product.name}</p>
        <p>₪ {product.price}</p>
        <CartItemQuantity>
          <AiOutlineMinus size={20} onClick={handleDecrease} />
          <p>{product.quantity}</p>
          <AiOutlinePlus size={20} onClick={handleIncrease} />
        </CartItemQuantity>
      </CartItemInfo>
      <RemoveButton onClick={handleRemoveClick}>
        <AiOutlineClose size={20} />
      </RemoveButton>
    </CartItemContainer>
  );
};

export default CartItem;
