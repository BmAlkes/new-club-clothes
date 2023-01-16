import { BsGoogle } from "react-icons/bs";
import { FiLogIn } from "react-icons/fi";
import Input from "../../components/custom-input/Input";

// Components
import CustomButton from "../../components/custombutton/CustomButton";
import Header from "../../components/header/header.components";

//Styles
import {
  LoginContainer,
  LoginHeadline,
  LoginInputContainer,
  LoginSubtitle,
  LoginContent,
} from "./login.styles";

const Login = () => {
  return (
    <>
      <Header />

      <LoginContainer>
        <LoginContent>
          <LoginHeadline>Enter with your Account</LoginHeadline>
          <CustomButton startIcon={<BsGoogle size={20} />}>
            Enter with Google
          </CustomButton>
          <LoginSubtitle>Or entre with your Email</LoginSubtitle>
          <LoginInputContainer>
            <Input placeholder="Enter your email" type="email" />
          </LoginInputContainer>
          <LoginInputContainer>
            <Input placeholder="Enter your password" type="password" />
          </LoginInputContainer>
          <CustomButton startIcon={<FiLogIn size={20} />}>Enter</CustomButton>
        </LoginContent>
      </LoginContainer>
    </>
  );
};

export default Login;
