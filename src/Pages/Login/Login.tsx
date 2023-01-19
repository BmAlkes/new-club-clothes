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
import {
  AuthError,
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../config/firebase.config";

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<LoginForm>();

  const handleSubmitPress = async (data: LoginForm) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      console.log(userCredential);
    } catch (error) {
      const _error = error as AuthError;
      if (_error.code === AuthErrorCodes.INVALID_PASSWORD) {
        return setError("password", { type: "wrongPassword" });
      }
      if (_error.code === AuthErrorCodes.USER_DELETED) {
        return setError("email", { type: "notFound" });
      }
    }
  };

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
            {errors?.email?.type === "notFound" && (
              <InputError>Email is Not found</InputError>
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
            {errors?.password?.type === "wrongPassword" && (
              <InputError>Password Invalid</InputError>
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
