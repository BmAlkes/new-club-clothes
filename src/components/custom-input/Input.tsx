import React, { InputHTMLAttributes } from "react";
import { CustomInputContainer } from "./CustomInput.styles";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

const Input: React.FC<CustomInputProps> = ({ hasError, ...rest }) => {
  return <CustomInputContainer hasError={hasError} {...rest} />;
};

export default Input;
