// Components
import { onAuthStateChanged } from "firebase/auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { auth, db } from "./config/firebase.config";
import { UserContext } from "./contexts/UserContext";
import { useContext } from "react";

//Pages
import Home from "./Pages/home/home.page";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/SignUp/Signup";
import { collection, getDocs, query, where } from "firebase/firestore";

const App = () => {
  const { isAutheticated, loginUser, logoutUser } = useContext(UserContext);
  onAuthStateChanged(auth, async (user) => {
    // se o usuario estiver logado no contexto, eo usuario do firebase( sign out)
    // devemos limpar o contexto (Sign out)

    const isSignout = isAutheticated && !user;
    if (isSignout) {
      return logoutUser();
    }
    // se o usuario for nulo no contexto e nao for nulo no firebase devemos fazer login

    const isSignIn = !isAutheticated && user;
    if (isSignIn) {
      const querySnapshot = await getDocs(
        query(collection(db, "users"), where("id", "==", user.uid))
      );
      const userFromFireStore = querySnapshot.docs[0]?.data();
      return loginUser(userFromFireStore as any);
    }
  });

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
