import { BsGoogle } from "react-icons/bs";
import { FiLogIn } from "react-icons/fi";
import Input from "../../components/custom-input/Input";
import { useForm } from "react-hook-form";

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
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleSubmitPress = (data: any) => {
    console.log(data);
  };

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
            <p>Email</p>
            <Input
              hasError={!!errors?.email}
              placeholder="Enter your email"
              type="email"
              {...register("email", { required: true })}
            />
          </LoginInputContainer>

          <LoginInputContainer>
            <p>Password</p>
            <Input
              hasError={!!errors?.password}
              placeholder="Enter your password"
              type="password"
              {...register("password", { required: true })}
            />
          </LoginInputContainer>
          <CustomButton
            startIcon={
              <FiLogIn
                size={20}
                onClick={() => handleSubmit(handleSubmitPress)()}
              />
            }
          >
            Enter
          </CustomButton>
        </LoginContent>
      </LoginContainer>
    </>
  );
};

export default Login;
