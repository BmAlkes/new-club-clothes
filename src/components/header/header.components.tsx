import { BsCart3 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
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
