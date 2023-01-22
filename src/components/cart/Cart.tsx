import React, { useContext } from "react";
import CartItem from "../CartItem/Cart-item";
import CustomButton from "../custombutton/CustomButton";
import {
  CartContainer,
  CartContent,
  CartEscapeArea,
  CartTitle,
  CartTotal,
} from "./Cart.styles";
import { BsCart } from "react-icons/bs";
import { CartContext } from "../../contexts/CartContext";

const Cart = () => {
  const { isVisible, toggleCart, products } = useContext(CartContext);
  return (
    <CartContainer isVisible={isVisible}>
      <CartEscapeArea onClick={toggleCart} />
      <CartContent>
        <CartTitle>Our Cart</CartTitle>
        {products.map((product) => (
          <CartItem key={product.id} product={product} />
        ))}
        <CartTotal>Total: 999</CartTotal>
        <CustomButton startIcon={<BsCart size={36} />}>
          Go to Checkout
        </CustomButton>
      </CartContent>
    </CartContainer>
  );
};

export default Cart;
