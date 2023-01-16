import { BsCart3 } from "react-icons/bs";
import {
  HeaderContainer,
  HeaderItem,
  HeaderItems,
  HeaderTitle,
} from "./header.styles";

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderTitle> Club Clothings</HeaderTitle>
      <HeaderItems>
        <HeaderItem>Explores</HeaderItem>
        <HeaderItem>Login</HeaderItem>
        <HeaderItem>Create Account</HeaderItem>
        <HeaderItem>
          <BsCart3 size={25} /> <p style={{ marginLeft: 10 }}>5</p>
        </HeaderItem>
      </HeaderItems>
    </HeaderContainer>
  );
};

export default Header;
