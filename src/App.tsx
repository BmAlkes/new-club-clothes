// Components
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Pages
import Home from "./Pages/home/home.page";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
