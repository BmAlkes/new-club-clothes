import React from "react";
import { InputErrorMessageContainer } from "./inputError.styles";

interface InputErrorProps {
  children: React.ReactNode;
}

const InputError: React.FC<InputErrorProps> = ({ children }) => {
  return <InputErrorMessageContainer>{children}</InputErrorMessageContainer>;
};

export default InputError;
