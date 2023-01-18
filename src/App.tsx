// Components
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Pages
import Home from "./Pages/home/home.page";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/SignUp/Signup";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
