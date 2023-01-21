import { HashLoader } from "react-spinners";
import { LoadingContainer } from "./loading.styles";

const Loading = () => {
  return (
    <LoadingContainer>
      <HashLoader size={50} color="#18151f" />
    </LoadingContainer>
  );
};

export default Loading;
