import React, { useContext, useState } from "react";
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
import axios from "axios";
import Loading from "../loading/Loading.component";

const Checkout: React.FC = () => {
  const { products, productsTotalPrice } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleFinishPurchase = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/create-checkout-session`!,
        {
          products,
        }
      );
      window.location.href = data.url;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
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
            <CustomButton
              startIcon={<BsBagCheck size={20} />}
              onClick={handleFinishPurchase}
            >
              Finish Purchase
            </CustomButton>
          </>
        ) : (
          <p>Empty Cart</p>
        )}
      </CheckoutContainer>
    </>
  );
};

export default Checkout;
