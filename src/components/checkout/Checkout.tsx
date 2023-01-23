import React, { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import CustomButton from "../custombutton/CustomButton";
import { BsBagCheck } from "react-icons/bs";
import {
  CheckoutContainer,
  CheckoutProducts,
  CheckoutTitle,
  CheckoutTotal,
} from "./Checkout.styles";
import CartItem from "../CartItem/Cart-item";

const Checkout: React.FC = () => {
  const { products, productsTotalPrice } = useContext(CartContext);
  return (
    <CheckoutContainer>
      <CheckoutTitle>Checkout</CheckoutTitle>

      {products.length > 0 ? (
        <>
          <CheckoutProducts>
            {products.map((product) => (
              <CartItem key={product.id} product={product} />
            ))}
          </CheckoutProducts>
          <CheckoutTotal>{`Total:  ₪ ${productsTotalPrice}`}</CheckoutTotal>
          <CustomButton startIcon={<BsBagCheck size={20} />}>
            Finish Purchase
          </CustomButton>
        </>
      ) : (
        <p>Empty Cart</p>
      )}
    </CheckoutContainer>
  );
};

export default Checkout;
