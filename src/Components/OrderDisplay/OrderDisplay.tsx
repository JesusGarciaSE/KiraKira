import { MdArrowBack } from "react-icons/md";
import { IOrderDetails } from "../../Models/ComponentModels";
import AddressDisplay from "./AddressDisplay";

const OrderDisplay: React.FC<IOrderDetails> = ({
  className,
  order,
  clearOrder,
}) => {
  return (
    <div className={`${className} flex flex-col gap-4 overflow-hidden`}>
      <div className=" gap-4 text-2xl font-bold">
        <div className="flex flex-row gap-2">
          <div onClick={clearOrder}>
            <MdArrowBack className="text-navIcon h-8 w-8" />
          </div>
          <p className="self-center">Order</p>
        </div>
        <p>{order.order_id}</p>
      </div>
      <p>
        {new Date(order.created).toLocaleString("default", {
          month: "long",
          day: "2-digit",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })}
      </p>
      <ul>
        {order.items.map((item, index) => (
          <li
            key={`${item.id}_${index}`}
            className="flex flex-row justify-between border-solid border-y-1 border-y-purple-600 first:border-b-0 last:border-t-0 py-4"
          >
            <img src={item.image} className="w-36 aspect-square" />
            <p className="place-self-center">{item.quantity}</p>
            <p className="place-self-center">
              ${(item.quantity * item.cost) / 100}
            </p>
          </li>
        ))}
        <li className="flex flex-row justify-between border-solid border-y-1 border-y-purple-600 first:border-b-0 last:border-t-0 py-4">
          <p>Subtotal</p>
          <p>${order.subtotal / 100}</p>
        </li>
        <li className="flex flex-row justify-between border-solid border-y-1 border-y-purple-600 first:border-b-0 last:border-t-0 py-4">
          <p>Total</p>
          <p>${order.total / 100}</p>
        </li>
        {order.shipping_address && (
          <li>
            <AddressDisplay address={order.shipping_address} type="shipping" />
          </li>
        )}
        {order.billing_address && (
          <li>
            <AddressDisplay address={order.billing_address} type="billing" />
          </li>
        )}
      </ul>
    </div>
  );
};

export default OrderDisplay;
