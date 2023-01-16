// Components
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Pages
import Home from "./Pages/home/home.page";
import Login from "./Pages/Login/Login";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
