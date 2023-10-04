import { IOrderDisplayItem } from "../../Models/ComponentModels";
import { IOrder } from "../../Models/ItemModels";

interface IAccountTableItem extends IOrderDisplayItem {
  setOrder(order: IOrder): void;
}

const AccountTableItem: React.FC<IAccountTableItem> = ({
  className,
  order,
  setOrder
}) => {
  return (
    <div className={`${className} flex flex-row gap-4`}>
      <div className="text-blue-600 w-24" onClick={() => setOrder(order)}>
        {order.orderId.slice(0, 6)}
      </div>
      <div className="w-24">
        {new Date(order.created).toLocaleString("default", {
          month: "long",
          day: "2-digit",
          year: "numeric",
        })}
      </div>
      <div className="w-24">{order.paymentStatus ? "Paid" : "Unpaid"}</div>
      <div className="w-24">
        {order.fulfillmentStatus ? "Fulfilled" : "Unfulfilled"}
      </div>
      <div className="w-24">{`$${(order.total as number) / 100}`}</div>
    </div>
  );
};

export default AccountTableItem;
