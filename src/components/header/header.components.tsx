import { useContext } from "react";
import { BsCart3 } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import rootReducer from "../../store/root-reducer";
import userReducer from "../../store/reducers/users/user.reducer";
import cartReducer from "../../store/reducers/cart/cart.reducers";
import {
  HeaderContainer,
  HeaderItem,
  HeaderItems,
  HeaderTitle,
} from "./header.styles";
import { useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase.config";
import { logoutUser } from "../../store/reducers/users/user.actions";
import { toggleCart } from "../../store/reducers/cart/cart.actions";

const Header = () => {
  const { products } = useContext(CartContext);

  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector(
    (rootReducer: any) => rootReducer.userReducer
  );
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignOutClick = () => {
    dispatch(logoutUser());
    signOut(auth);
  };
  const handleCartClick = () => {
    dispatch(toggleCart());
  };

  return (
    <HeaderContainer>
      <HeaderTitle onClick={() => navigate("/")}> Club Clothings</HeaderTitle>
      <HeaderItems>
        <HeaderItem onClick={() => navigate("/explorer")}>Explores</HeaderItem>

        {!isAuthenticated && (
          <>
            <HeaderItem onClick={handleLoginClick}>Login</HeaderItem>
            <HeaderItem onClick={() => navigate("/register")}>
              Create Account
            </HeaderItem>
          </>
        )}
        {isAuthenticated && (
          <HeaderItem onClick={handleSignOutClick}>Logout</HeaderItem>
        )}
        <HeaderItem onClick={handleCartClick}>
          <BsCart3 size={25} />{" "}
          <p style={{ marginLeft: 10 }}>{products.length}</p>
        </HeaderItem>
      </HeaderItems>
    </HeaderContainer>
  );
};

export default Header;
