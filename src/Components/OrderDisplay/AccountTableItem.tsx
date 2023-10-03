import { Link } from "react-router-dom";
import { ICustomizableComponent } from "../../Models/ComponentModels";
import { IOrder } from "../../Models/ItemModels";

interface IAccountTableItem extends ICustomizableComponent {
  order: IOrder;
}

const AccountTableItem: React.FC<IAccountTableItem> = ({
  className,
  order,
}) => {
  return (
    <div className={`${className} flex flex-row gap-4`}>
      <Link to={`/order/${order.orderId}`} className="text-blue-600 w-24">
        {order.orderId.slice(0, 6)}
      </Link>
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
