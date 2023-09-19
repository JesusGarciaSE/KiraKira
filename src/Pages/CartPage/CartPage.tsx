// import { useAuth } from "../../Services/AuthContext";
import Button from "../../Components/Buttons/Button";
import { ICustomizableComponent } from "../../Models/ComponentModels";
import { useCart } from "../../Services/CartContext";
import CartItem from "./CartItem";

const CartPage: React.FC<ICustomizableComponent> = ({ className }) => {
  const { shoppingCart, cartSize, cartSubtotal } = useCart();

  const checkOut = () => {
    console.log("checkout");
  };

  return (
    <div className={`${className} p-5 overflow-x-hidden overflow-y-scroll`}>
      <p className="text-3xl font-bold">Shopping Cart</p>
      <ul className="py-4 overflow-hidden overflow-x-hidden overflow-y-auto flex-1">
        {shoppingCart.map((item) => (
          <li
            key={item.id}
            className="border-solid border-y-1 border-y-purple-600"
          >
            <CartItem item={item} />
          </li>
        ))}
      </ul>
      <p className="w-full text-2xl font-bold text-right ml-auto">
        Subtotal ({cartSize} item{cartSize > 1 && "s"}): ${cartSubtotal}
      </p>
      <Button
        label="Proceed to Checkout"
        className="h-12 w-full mt-4 shadow-lg bg-gradient-to-b from-kira-bg-end via-kira-bg-through to-kira-bg-start rounded-lg"
        textOptions="text-2xl"
        onClick={checkOut}
      />
    </div>
  );
};

export default CartPage;