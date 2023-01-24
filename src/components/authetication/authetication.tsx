import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Utilities
import rootReducer from "../../store/root-reducer";
import userReducer from "../../store/reducers/user.reducer";

// Components
import Header from "../header/header.components";
import Loading from "../loading/Loading.component";

interface Props {
  children: React.ReactNode;
}

const AuthenticationGuard: React.FC<Props> = ({ children }) => {
  const { isAuthenticated } = useSelector(
    (rootReducer: any) => rootReducer.userReducer
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <Loading message="You must be logged in to access this page. You will be redirected to the login page shortly... " />
      </>
    );
  }

  return <>{children}</>;
};

export default AuthenticationGuard;
