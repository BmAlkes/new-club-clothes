import { Children, createContext, useState } from "react";
import CartProduct from "../types/cart.types";
import Product from "../types/product.types";

interface ICartContext {
  isVisible: boolean;
  products: CartProduct[];
  toggleCart: () => void;
  addProductToCart: (product: Product) => void;
  removeProductFromCart: (productId: string) => void;
}

interface ChildrenProps {
  children: React.ReactNode;
}

export const CartContext = createContext<ICartContext>({
  isVisible: false,
  products: [],
  toggleCart: () => {},
  addProductToCart: () => {},
  removeProductFromCart: () => {},
});

const CartContextProvide: React.FC<ChildrenProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [products, setProducts] = useState<CartProduct[]>([]);

  const addProductToCart = (product: Product) => {
    //verificar se o produto ja esta no carrinho

    const productAlreadyInCart = products.some(
      (item) => item.id === product.id
    );

    // se estiver aumentar quantidade
    if (productAlreadyInCart) {
      return setProducts((products) =>
        products.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    }
    // se nao adiciona-lo
    setProducts((prevState) => [...prevState, { ...product, quantity: 1 }]);
  };

  const toggleCart = () => {
    setIsVisible((prevState) => !prevState);
  };

  const removeProductFromCart = (ProductId: string) => {
    setProducts((products) =>
      products.filter((product) => product.id !== ProductId)
    );
  };

  return (
    <CartContext.Provider
      value={{
        isVisible,
        products,
        toggleCart,
        addProductToCart,
        removeProductFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvide;
