import { BsGoogle } from "react-icons/bs";
import { FiLogIn } from "react-icons/fi";
import { FaFacebook } from "react-icons/fa";
import Input from "../../components/custom-input/Input";
import { useForm } from "react-hook-form";
import validator from "validator";

// Components
import CustomButton from "../../components/custombutton/CustomButton";
import Header from "../../components/header/header.components";
import InputError from "../../components/input-error-message/InputError";

//Styles
import {
  LoginContainer,
  LoginHeadline,
  LoginInputContainer,
  LoginSubtitle,
  LoginContent,
} from "./login.styles";
import { createUserWithEmailAndPassword } from "firebase/auth";

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginForm>();

  const handleSubmitPress = async (data: LoginForm) => {};

  console.log({ errors });

  return (
    <>
      <Header />

      <LoginContainer>
        <LoginContent>
          <LoginHeadline>Enter with your Account</LoginHeadline>
          <CustomButton startIcon={<BsGoogle size={20} />}>
            Enter with Google
          </CustomButton>
          <LoginHeadline></LoginHeadline>
          <CustomButton startIcon={<FaFacebook size={20} />}>
            Enter with Facebook
          </CustomButton>
          <LoginSubtitle>Or entre with your Email</LoginSubtitle>
          <LoginInputContainer>
            <p>Email</p>
            <Input
              hasError={!!errors?.email}
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: (value) => {
                  return validator.isEmail(value);
                },
              })}
            />
            {errors?.email?.type === "required" && (
              <InputError>email is required</InputError>
            )}
            {errors?.email?.type === "validate" && (
              <InputError>email is not valid</InputError>
            )}
          </LoginInputContainer>

          <LoginInputContainer>
            <p>Password</p>
            <Input
              hasError={!!errors?.password}
              placeholder="Enter your password"
              type="password"
              {...register("password", { required: true })}
            />
            {errors?.password?.type === "required" && (
              <InputError>Password is required</InputError>
            )}
          </LoginInputContainer>
          <CustomButton
            startIcon={<FiLogIn size={20} />}
            onClick={() => handleSubmit(handleSubmitPress)()}
          >
            Enter
          </CustomButton>
        </LoginContent>
      </LoginContainer>
    </>
  );
};

export default Login;
