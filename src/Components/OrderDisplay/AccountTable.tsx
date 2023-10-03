import { IOrderDisplayList } from "../../Models/ComponentModels";
import AccountTableItem from "./AccountTableItem";



const ORDER_COLUMNS = ["Order", "Date", "Payment", "Fulfillment", "Total"];

const AccountTable: React.FC<IOrderDisplayList> = ({
  className,
  orders,
}) => {
  console.log('account table', orders)
  return (
    <div className={`${className} flex flex-col w-fit`}>
      <div className="flex flex-row gap-4">
        {ORDER_COLUMNS.map((header, index) => (
          <label key={`${header}_${index}`} className="font-bold text-xl w-24">
            {header}
          </label>
        ))}
      </div>
      {orders.map((order, index) => (
        <AccountTableItem key={`${order.orderId}_${index}`} order={order} />
      ))}
    </div>
  );
};

export default AccountTable;
