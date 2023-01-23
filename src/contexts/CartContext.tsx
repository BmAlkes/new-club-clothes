import { Children, createContext, useEffect, useMemo, useState } from "react";
import CartProduct from "../types/cart.types";
import Product from "../types/product.types";

interface ICartContext {
  isVisible: boolean;
  products: CartProduct[];
  toggleCart: () => void;
  addProductToCart: (product: Product) => void;
  removeProductFromCart: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  decreaseProductQuantity: (productId: string) => void;
  productsTotalPrice: Number;
  clearProducts: () => void;
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
  increaseProductQuantity: () => {},
  decreaseProductQuantity: () => {},
  productsTotalPrice: 0,
  clearProducts: () => {},
});

const CartContextProvide: React.FC<ChildrenProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [products, setProducts] = useState<CartProduct[]>([]);

  useEffect(() => {
    const productsFromLocalStorage = JSON.parse(
      localStorage.getItem("cartProducts")!
    );

    setProducts(productsFromLocalStorage);
  }, []);

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(products));
  }, [products]);

  const productsTotalPrice = useMemo(() => {
    return products.reduce((acc, currentProduct) => {
      return acc + currentProduct.price * currentProduct.quantity;
    }, 0);
  }, [products]);

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

  const increaseProductQuantity = (productId: string) => {
    setProducts((products) =>
      products.map((product) =>
        product.id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };
  const decreaseProductQuantity = (productId: string) => {
    setProducts((products) =>
      products
        .map((product) =>
          product.id === productId
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
        .filter((product) => product.quantity > 0)
    );
  };
  const clearProducts = () => {
    setProducts([]);
  };

  return (
    <CartContext.Provider
      value={{
        isVisible,
        products,
        toggleCart,
        addProductToCart,
        removeProductFromCart,
        increaseProductQuantity,
        decreaseProductQuantity,
        productsTotalPrice,
        clearProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvide;
