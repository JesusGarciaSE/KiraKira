import { Link } from "react-router-dom";
import { ICustomizableComponent } from "../../Models/ComponentModels";
import { IOrder } from "../../Models/ItemModels";

interface IAccountTableItem extends ICustomizableComponent {
  order: IOrder;
}

const ORDER_DATA = [
  "orderId",
  "created",
  "paymentStatus",
  "fulfillmentStatus",
  "total",
];

const AccountTableItem: React.FC<IAccountTableItem> = ({
  className,
  order,
}) => {
  const getDetails = (key: string, value: string | boolean | number) => {
    console.log(key, value);
    switch (key) {
      case "created":
        return new Date(value as number).toLocaleString("default", {
          month: "long",
          day: "2-digit",
          year: "numeric",
        });
      case "paymentStatus":
        return (value as boolean) ? "Paid" : "Unpaid";
      case "fulfillmentStatus":
        return (value as boolean) ? "Fulfilled" : "Unfulfilled";
      case "total":
        return `$${(value as number) / 100}`;
      default: //orderId
        return (value as string).slice(0, 6);
    }
  };
  return (
    <div className={`${className} flex flex-row gap-4`}>
      {ORDER_DATA.map((key, index) => (
        <div key={`${key}_${index}`} className="w-24">
          {key === "orderId" ? (
            <Link to={`/order/${order[key]}`} className="text-blue-600">
              {getDetails(key, order[key])}
            </Link>
          ) : (
            getDetails(key, order[key])
          )}
        </div>
      ))}
    </div>
  );
};

export default AccountTableItem;
