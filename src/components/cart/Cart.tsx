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
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { isVisible, toggleCart, products, productsTotalPrice } =
    useContext(CartContext);
  const navigate = useNavigate();

  const handleGoToCheckout = () => {
    navigate("/checkout");
    toggleCart();
  };
  return (
    <CartContainer isVisible={isVisible}>
      <CartEscapeArea onClick={toggleCart} />
      <CartContent>
        <CartTitle>Our Cart</CartTitle>
        {products.map((product) => (
          <CartItem key={product.id} product={product} />
        ))}
        {products.length > 0 && (
          <>
            <CartTotal>{`Total:  ₪ ${productsTotalPrice}`}</CartTotal>
            <CustomButton
              startIcon={<BsCart size={36} />}
              onClick={handleGoToCheckout}
            >
              Go to Checkout
            </CustomButton>
          </>
        )}
        {products.length === 0 && <p>Empty cart</p>}
      </CartContent>
    </CartContainer>
  );
};

export default Cart;
