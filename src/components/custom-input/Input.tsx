import React, { InputHTMLAttributes } from "react";
import { CustomInputContainer } from "./CustomInput.styles";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

const Input: React.FC<CustomInputProps> = React.forwardRef((props, ref) => {
  return <CustomInputContainer {...props} ref={ref as any} />;
});
Input.displayName = "CustomInput";
export default Input;
