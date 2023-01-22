import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import CartContextProvide from "./contexts/CartContext";
import CategorieContextProvider from "./contexts/CategorieContext";
import UserContextProvider from "./contexts/UserContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <UserContextProvider>
      <CategorieContextProvider>
        <CartContextProvide>
          <App />
        </CartContextProvide>
      </CategorieContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
