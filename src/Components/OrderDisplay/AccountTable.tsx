import { IAccountTable } from "../../Models/ComponentModels";
import AccountTableItem from "./AccountTableItem";

const ORDER_COLUMNS = ["Order", "Date", "Payment", "Fulfillment", "Total"];

const AccountTable: React.FC<IAccountTable> = ({
  className,
  orders,
  setOrder,
}) => {
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
        <AccountTableItem
          key={`${order.order_id}_${index}`}
          order={order}
          setOrder={setOrder}
        />
      ))}
    </div>
  );
};

export default AccountTable;
