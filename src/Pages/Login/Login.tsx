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
          {/* button */}
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
