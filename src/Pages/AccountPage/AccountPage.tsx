import { useEffect, useState } from "react";
import { ICustomizableComponent } from "../../Models/ComponentModels";
import { firestore } from "../../Services/FirebaseServices";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../../Services/AuthContext";
import { IUser } from "../../Models/UserModels";
import { IOrder } from "../../Models/ItemModels";
import AccountTable from "../../Components/OrderDisplay/AccountTable";
import OrderDisplay from "../../Components/OrderDisplay/OrderDisplay";

const AccountPage: React.FC<ICustomizableComponent> = ({ className }) => {
  const { userId } = useAuth();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [order, setOrder] = useState<IOrder>();
  useEffect(() => {
    const getUser = async () => {
      if (!userId) return;
      const userDocRef = doc(firestore, "Users", userId);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) return;
      const user = (await userDoc.data()) as IUser;
      console.log(user as IUser);
      setOrders(() => {
        return user.orders;
      });
    };
    getUser();
  }, [userId]);

  const clearOrder = () => {
    setOrder(() => {
      return undefined;
    })
  }

  return (
    <div className={`${className} p-5 overflow-scroll`}>
      <h1 className="px-5 text-2xl font-bold">Account</h1>
      {order ? (
        <OrderDisplay order={order} clearOrder={clearOrder} />
      ) : (
        <div className="overflow-scroll">
          <AccountTable orders={orders} setOrder={setOrder} />
        </div>
      )}
    </div>
  );
};

export default AccountPage;
