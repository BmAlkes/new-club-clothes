import { signOut } from "firebase/auth";
import { useContext } from "react";
import { BsCart3 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase.config";
import { UserContext } from "../../contexts/UserContext";
import {
  HeaderContainer,
  HeaderItem,
  HeaderItems,
  HeaderTitle,
} from "./header.styles";

const Header = () => {
  const { isAutheticated, currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/login");
  };
  return (
    <HeaderContainer>
      <HeaderTitle onClick={() => navigate("/")}> Club Clothings</HeaderTitle>
      <HeaderItems>
        {isAutheticated && (
          <HeaderItem>{`Welcome ${currentUser?.firstName}`}</HeaderItem>
        )}
        <HeaderItem>Explores</HeaderItem>

        {!isAutheticated && (
          <>
            <HeaderItem onClick={handleLoginClick}>Login</HeaderItem>
            <HeaderItem onClick={() => navigate("/register")}>
              Create Account
            </HeaderItem>
          </>
        )}
        {isAutheticated && (
          <HeaderItem onClick={() => signOut(auth)}>Logout</HeaderItem>
        )}
        <HeaderItem>
          <BsCart3 size={25} /> <p style={{ marginLeft: 10 }}>5</p>
        </HeaderItem>
      </HeaderItems>
    </HeaderContainer>
  );
};

export default Header;
