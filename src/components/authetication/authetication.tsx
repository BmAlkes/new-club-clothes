import React, { FunctionComponent, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Utilities
import { UserContext } from "../../contexts/UserContext";

// Components
import Header from "../header/header.components";
import Loading from "../loading/Loading.component";

interface Props {
  children: React.ReactNode;
}

const AuthenticationGuard: React.FC<Props> = ({ children }) => {
  const { isAutheticated } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAutheticated) {
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }, [isAutheticated]);

  if (!isAutheticated) {
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
