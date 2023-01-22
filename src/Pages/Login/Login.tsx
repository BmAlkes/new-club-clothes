import { BsGoogle } from "react-icons/bs";
import { FiLogIn } from "react-icons/fi";
import { FaFacebook } from "react-icons/fa";
import Input from "../../components/custom-input/Input";
import { useForm } from "react-hook-form";
import validator from "validator";
import { useEffect, useContext, useState } from "react";

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
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import {
  auth,
  db,
  facebookProvider,
  googleProvider,
} from "../../config/firebase.config";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { UserContext } from "../../contexts/UserContext";
import { Navigate, useNavigate } from "react-router-dom";
import Loading from "../../components/loading/Loading.component";

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

  const [isLoading, setIsLoading] = useState(false);

  const { isAutheticated } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAutheticated) {
      navigate("/");
    }
  }, [isAutheticated]);

  const handleSubmitPress = async (data: LoginForm) => {
    try {
      setIsLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await addDoc(collection(db, "users"), {
        id: userCredential.user.uid,
        email: userCredential.user.email,
        provider: "firebase",
      });
    } catch (error) {
      const _error = error as AuthError;
      if (_error.code === AuthErrorCodes.INVALID_PASSWORD) {
        return setError("password", { type: "wrongPassword" });
      }

      if (_error.code === AuthErrorCodes.USER_DELETED) {
        return setError("email", { type: "notFound" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSingInWithGoogle = async () => {
    try {
      setIsLoading(true);
      const userCredentials = await signInWithPopup(auth, googleProvider);
      const querySnapshot = await getDocs(
        query(
          collection(db, "users"),
          where("id", "==", userCredentials.user.uid)
        )
      );

      const user = querySnapshot.docs[0]?.data;
      if (!user) {
        const firstname = userCredentials.user.displayName?.split(" ")[0];
        const lastname = userCredentials.user.displayName?.split(" ")[1];
        await addDoc(collection(db, "users"), {
          id: userCredentials.user.uid,
          email: userCredentials.user.email,
          firstname,
          lastname,
          provider: "google",
        });
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleSinginWithFacebook = async () => {
    try {
      setIsLoading(true);
      const userCredentials = await signInWithPopup(auth, facebookProvider);
      const querySnapshot = await getDocs(
        query(
          collection(db, "users"),
          where("id", "==", userCredentials.user.uid)
        )
      );

      const user = querySnapshot.docs[0]?.data;
      if (!user) {
        const firstname = userCredentials.user.displayName?.split(" ")[0];
        const lastname = userCredentials.user.displayName?.split(" ")[1];
        await addDoc(collection(db, "users"), {
          id: userCredentials.user.uid,
          email: userCredentials.user.email,
          firstname,
          lastname,
          provider: "Facebook",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />

      {isLoading && <Loading />}

      <LoginContainer>
        <LoginContent>
          <LoginHeadline>Enter with your Account</LoginHeadline>
          <CustomButton
            startIcon={<BsGoogle size={20} />}
            onClick={handleSingInWithGoogle}
          >
            Enter with Google
          </CustomButton>
          <LoginHeadline></LoginHeadline>
          <CustomButton
            startIcon={<FaFacebook size={20} />}
            onClick={handleSinginWithFacebook}
          >
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
