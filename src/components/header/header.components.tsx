import { signOut } from "firebase/auth";
import { BsCart3 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase.config";
import {
  HeaderContainer,
  HeaderItem,
  HeaderItems,
  HeaderTitle,
} from "./header.styles";

const Header = () => {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/login");
  };
  return (
    <HeaderContainer>
      <HeaderTitle onClick={() => navigate("/")}> Club Clothings</HeaderTitle>
      <HeaderItems>
        <HeaderItem>Explores</HeaderItem>
        <HeaderItem onClick={handleLoginClick}>Login</HeaderItem>
        <HeaderItem onClick={() => signOut(auth)}>Logout</HeaderItem>
        <HeaderItem onClick={() => navigate("/register")}>
          Create Account
        </HeaderItem>
        <HeaderItem>
          <BsCart3 size={25} /> <p style={{ marginLeft: 10 }}>5</p>
        </HeaderItem>
      </HeaderItems>
    </HeaderContainer>
  );
};

export default Header;
