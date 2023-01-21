import React, { useContext, useEffect } from "react";
import { FiLogIn } from "react-icons/fi";
import Input from "../../components/custom-input/Input";
import { useForm } from "react-hook-form";
import validator from "validator";
import {
  AuthError,
  AuthErrorCodes,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../config/firebase.config";
import { addDoc, collection } from "firebase/firestore";

// styles
import CustomButton from "../../components/custombutton/CustomButton";
import {
  SignUpContainer,
  SignUpContent,
  SignUpHeadline,
  SignUpInputContainer,
} from "./SignUp.styles";
import Header from "../../components/header/header.components";
import InputError from "../../components/input-error-message/InputError";
import { UserContext } from "../../contexts/UserContext";
import { Navigate, useNavigate } from "react-router-dom";

interface SignUpForm {
  name: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<SignUpForm>();
  const watchPassword = watch("password");

  const { isAutheticated } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAutheticated) {
      navigate("/");
    }
  }, [isAutheticated]);

  const handleSubmitPress = async (data: SignUpForm) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await addDoc(collection(db, "users"), {
        id: userCredentials.user.uid,
        name: data.name,
        lastName: data.lastName,
        email: userCredentials.user.email,
        provider: "firebase",
      });
    } catch (err) {
      const _error = err as AuthError;
      if (_error.code === AuthErrorCodes.EMAIL_EXISTS) {
        return setError("email", { type: "alreadyInUse" });
      }
    }
  };

  return (
    <>
      <Header />

      <SignUpContainer>
        <SignUpContent>
          <SignUpHeadline>Create your Account</SignUpHeadline>

          <SignUpInputContainer>
            <p>Name</p>
            <Input
              hasError={!!errors?.name}
              placeholder="Enter your name"
              {...register("name", { required: true })}
            />
            {errors?.name?.type === "required" && (
              <InputError>Name is required</InputError>
            )}
          </SignUpInputContainer>
          <SignUpInputContainer>
            <p>LastName</p>
            <Input
              hasError={!!errors?.lastName}
              placeholder="Enter your Lastname"
              {...register("lastName", { required: true })}
            />
            {errors?.lastName?.type === "required" && (
              <InputError>LastName is required</InputError>
            )}
          </SignUpInputContainer>
          <SignUpInputContainer>
            <p>Email</p>
            <Input
              hasError={!!errors?.email}
              placeholder="Enter your email"
              {...register("email", {
                required: true,
                validate: (value) => {
                  return validator.isEmail(value);
                },
              })}
            />
            {errors?.email?.type === "required" && (
              <InputError>Email is required</InputError>
            )}
            {errors?.email?.type === "validate" && (
              <InputError>email is not valid</InputError>
            )}
            {errors?.email?.type === "alreadyInUse" && (
              <InputError>Email is already used</InputError>
            )}
          </SignUpInputContainer>
          <SignUpInputContainer>
            <p>Password</p>
            <Input
              hasError={!!errors?.password}
              placeholder="Enter your password"
              type="password"
              {...register("password", { required: true, minLength: 6 })}
            />
            {errors?.password?.type === "required" && (
              <InputError>Password is required</InputError>
            )}
            {errors?.password?.type === "minLength" && (
              <InputError>Password must have 6 caracteres</InputError>
            )}
          </SignUpInputContainer>
          <SignUpInputContainer>
            <p>Confirm Password</p>
            <Input
              hasError={!!errors?.passwordConfirmation}
              placeholder="Enter your  Confirm password"
              type="password"
              {...register("passwordConfirmation", {
                required: true,
                validate: (value) => {
                  return value === watchPassword;
                },
              })}
            />
            {errors?.passwordConfirmation?.type === "required" && (
              <InputError>Password Confirmation is required</InputError>
            )}
            {errors?.passwordConfirmation?.type === "validate" && (
              <InputError>
                Password Confirmation is not matches the current password
              </InputError>
            )}
          </SignUpInputContainer>

          <CustomButton
            startIcon={<FiLogIn size={20} />}
            onClick={() => handleSubmit(handleSubmitPress)()}
          >
            Register
          </CustomButton>
        </SignUpContent>
      </SignUpContainer>
    </>
  );
};

export default Signup;
