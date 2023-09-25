import ButtonSelector from "../../Components/QuantitySelector/ButtonSelector";
import { ICartItem } from "../../Models/ItemModels";
import { useCart } from "../../Services/CartContext";

const CartItem: React.FC<{ item: ICartItem }> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const increment = () => {
    item.quantity === 99
      ? updateQuantity(item.id, 99)
      : updateQuantity(item.id, item.quantity + 1);
  };

  const decrement = () => {
    item.quantity <= 1
      ? removeFromCart(item.id)
      : updateQuantity(item.id, item.quantity - 1);
  };

  const removeItem = () => {
    removeFromCart(item.id);
  };

  return (
    <div className="rounded-lg p-3 flex flex-row gap-2">
      <img src={item.image} className="aspect-auto h-32 my-auto" />
      <div className="flex flex-col flex-1 text-2xl">
        <p className="underline decoration-purple-600">{item.name}</p>
        <p className="w-fit font-bold">{item.cost/100}</p>
        <ButtonSelector
          className="h-12 w-36 my-5"
          initialValue={item.quantity}
          increment={increment}
          decrement={decrement}
          updateQuantity={(e: number) => updateQuantity(item.id, e)}
        />
        <p
          className="w-fit text-sm text-navClose underline decoration-navClose"
          onClick={removeItem}
        >
          Remove
        </p>
      </div>
    </div>
  );
};

export default CartItem;
