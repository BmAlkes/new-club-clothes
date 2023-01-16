import { FunctionComponent } from "react";

interface AppProps {
  message?: string;
}

const App: FunctionComponent<AppProps> = ({ message }) => {
  return <div className="App">{message} </div>;
};

export default App;
