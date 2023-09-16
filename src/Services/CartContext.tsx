import { createContext, useContext, useEffect, useState } from "react";
import { ICartItem } from "../Models/ItemModels";
import { IParentComponent } from "../Models/ComponentModels";

interface ICartContext {
  shoppingCart: ICartItem[];
  addToCart(item: ICartItem): void;
  removeFromCart(itemId: string): void;
}

export const CartContext = createContext<ICartContext>({
  shoppingCart: [],
  addToCart: () => {},
  removeFromCart: () => {},
});
export const useCart = (): ICartContext => {
  return useContext(CartContext);
};
export const CartContextProvider: React.FC<IParentComponent> = ({
  children,
}) => {
  const [shoppingCart, setShoppingCart] = useState<ICartItem[]>([]);

  useEffect(() => {
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
  }, [shoppingCart]);

  const addToCart = (newItem: ICartItem) => {
    console.log("CartContext, Add to cart called");
    setShoppingCart((prevCart) => {
      if (prevCart.some((item) => item.id === newItem.id)) {
        const index = prevCart.map((e) => e.id).indexOf(newItem.id);
        console.log("shoppingCart contains an instance of", prevCart[index]);
        prevCart[index].quantity += 1;
        return [...prevCart];
      }
      return [...prevCart, newItem];
    });
  };

  const removeFromCart = (itemId: string) => {
    setShoppingCart((prevCart) => {
      return prevCart.filter((item) => item.id !== itemId);
    });
  };

  const CartObj = {
    shoppingCart,
    addToCart,
    removeFromCart,
  };

  return (
    <CartContext.Provider value={CartObj}>{children}</CartContext.Provider>
  );
};

export default CartContextProvider;
