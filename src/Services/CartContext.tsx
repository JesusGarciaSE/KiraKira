import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ICartItem } from "../Models/ItemModels";
import { IParentComponent } from "../Models/ComponentModels";

interface ICartContext {
  shoppingCart: ICartItem[];
  cartSize: number;
  cartSubtotal: number;
  addToCart(item: ICartItem): void;
  removeFromCart(itemId: string): void;
  updateQuantity(itemId: string, quantity: number): void;
}

export const CartContext = createContext<ICartContext>({
  shoppingCart: [],
  cartSize: 0,
  cartSubtotal: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
});
export const useCart = (): ICartContext => {
  return useContext(CartContext);
};
export const CartContextProvider: React.FC<IParentComponent> = ({
  children,
}) => {
  const checkLocalCart = (): ICartItem[] => {
    const localCart = localStorage.getItem("shoppingCart");
    if (localCart) {
      return JSON.parse(localCart);
    }
    return [];
  };

  const [shoppingCart, setShoppingCart] = useState<ICartItem[]>(checkLocalCart);
  const [cartSize, setCartSize] = useState(0);
  const [cartSubtotal, setCartSubtotal] = useState(0);

  useEffect(() => {
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
  }, [shoppingCart]);

  useMemo(() => {
    let count = 0;
    let subtotal = 0;
    shoppingCart.forEach((item) => {
      count += item.quantity;
      subtotal += item.cost * item.quantity;
    });
    setCartSize(count);
    setCartSubtotal(subtotal);
  }, [shoppingCart]);

  const addToCart = (newItem: ICartItem) => {
    setShoppingCart((prevCart) => {
      console.log("prevCart", prevCart);
      if (prevCart.some((item) => item.id === newItem.id)) {
        const index = prevCart.map((e) => e.id).indexOf(newItem.id);
        prevCart[index].quantity += 1;
        console.log("current cart", shoppingCart);
        return [...prevCart];
      }
      return [...prevCart, newItem];
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    setShoppingCart((prevCart) => {
      const index = prevCart.map((e) => e.id).indexOf(itemId);
      prevCart[index].quantity = quantity;
      return [...prevCart];
    });
  };

  const removeFromCart = (itemId: string) => {
    setShoppingCart((prevCart) => {
      return prevCart.filter((item) => item.id !== itemId);
    });
  };

  const CartObj = {
    shoppingCart,
    cartSize,
    cartSubtotal,
    addToCart,
    removeFromCart,
    updateQuantity,
  };

  return (
    <CartContext.Provider value={CartObj}>{children}</CartContext.Provider>
  );
};

export default CartContextProvider;
