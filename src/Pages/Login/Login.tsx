import { BsGoogle } from "react-icons/bs";

import CustomButton from "../../components/custombutton/CustomButton";
import Header from "../../components/header/header.components";
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
          <LoginInputContainer>email</LoginInputContainer>
          <LoginInputContainer>password</LoginInputContainer>
          {/* button */}
        </LoginContent>
      </LoginContainer>
    </>
  );
};

export default Login;
