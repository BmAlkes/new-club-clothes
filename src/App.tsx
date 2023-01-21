// Components
import { onAuthStateChanged } from "firebase/auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { auth, db } from "./config/firebase.config";
import { UserContext } from "./contexts/UserContext";
import { useContext, useState } from "react";

//Pages
import Home from "./Pages/home/home.page";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/SignUp/Signup";
import { collection, getDocs, query, where } from "firebase/firestore";
import { userConverter } from "./converter/firestore.converter";
import Loading from "./components/loading/Loading.component";

const App = () => {
  const [isInitializing, setIsInitialized] = useState(true);
  const { isAutheticated, loginUser, logoutUser } = useContext(UserContext);
  onAuthStateChanged(auth, async (user) => {
    // se o usuario estiver logado no contexto, eo usuario do firebase( sign out)
    // devemos limpar o contexto (Sign out)

    const isSignout = isAutheticated && !user;
    if (isSignout) {
      logoutUser();
      return setIsInitialized(false);
    }
    // se o usuario for nulo no contexto e nao for nulo no firebase devemos fazer login

    const isSignIn = !isAutheticated && user;
    if (isSignIn) {
      const querySnapshot = await getDocs(
        query(
          collection(db, "users").withConverter(userConverter),
          where("id", "==", user.uid)
        )
      );
      const userFromFireStore = querySnapshot.docs[0]?.data();
      loginUser(userFromFireStore as any);
      return setIsInitialized(false);
    }
    return setIsInitialized(false);
  });
  if (isInitializing) return <Loading />;

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
