// Components
import { onAuthStateChanged } from "firebase/auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { auth, db } from "./config/firebase.config";
import { useEffect, useState } from "react";

//Pages
import Home from "./Pages/home/home.page";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/SignUp/Signup";
import { collection, getDocs, query, where } from "firebase/firestore";
import { userConverter } from "./converter/firestore.converter";
import Loading from "./components/loading/Loading.component";
import Explore from "./Pages/Explore/Explore";
import CategoryDetailsPage from "./Pages/CategorieDetails/CategoryDetails";
import Cart from "./components/cart/Cart";
import CheckouPage from "./Pages/Checkout/checkouPage";
import Authetication from "./components/authetication/authetication";
import PaymentConfirmation from "./Pages/PaymentConfirmation/PaymentConfirmation";
import { useDispatch, useSelector } from "react-redux";
import userReducer from "./store/reducers/user.reducer";

const App = () => {
  const [isInitializing, setIsInitialized] = useState(true);

  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(
    (rootReducer: any) => rootReducer.userReducer
  );

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      // se o usuario estiver logado no contexto, eo usuario do firebase( sign out)
      // devemos limpar o contexto (Sign out)

      const isSignout = isAuthenticated && !user;
      if (isSignout) {
        dispatch({ type: "LOGOUT_USER" });
        return setIsInitialized(false);
      }
      // se o usuario for nulo no contexto e nao for nulo no firebase devemos fazer login

      const isSignIn = !isAuthenticated && user;
      if (isSignIn) {
        const querySnapshot = await getDocs(
          query(
            collection(db, "users").withConverter(userConverter),
            where("id", "==", user.uid)
          )
        );
        const userFromFireStore = querySnapshot.docs[0]?.data();
        dispatch({ type: "LOGIN_USER", payload: userFromFireStore });
        return setIsInitialized(false);
      }
      return setIsInitialized(false);
    });
  }, [dispatch]);
  if (isInitializing) return <Loading />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/explorer" element={<Explore />} />
        <Route
          path="/checkout"
          element={
            <Authetication>
              <CheckouPage />
            </Authetication>
          }
        />
        <Route path="/payment-confirmation" element={<PaymentConfirmation />} />
        <Route path="/category/:id" element={<CategoryDetailsPage />} />
      </Routes>
      <Cart />
    </BrowserRouter>
  );
};

export default App;
