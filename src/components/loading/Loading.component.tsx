import React from "react";
import { HashLoader } from "react-spinners";
import { LoadingContainer } from "./loading.styles";

interface LoadingProps {
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message }) => {
  return (
    <LoadingContainer>
      {message && <p>{message}</p>}
      <HashLoader size={50} color="#18151f" />
    </LoadingContainer>
  );
};

export default Loading;
