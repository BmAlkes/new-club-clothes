import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import CartContextProvide from "./contexts/CartContext";
import CategorieContextProvider from "./contexts/CategorieContext";
import UserContextProvider from "./contexts/UserContext";
import "./index.css";
import store from "./store/store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <CategorieContextProvider>
        <CartContextProvide>
          <App />
        </CartContextProvide>
      </CategorieContextProvider>
    </Provider>
  </React.StrictMode>
);
