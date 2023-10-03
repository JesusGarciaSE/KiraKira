import { useEffect, useState } from "react";
import { ICustomizableComponent } from "../../Models/ComponentModels";
import { firestore } from "../../Services/FirebaseServices";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../../Services/AuthContext";
import { IUser } from "../../Models/UserModels";
import { IOrder } from "../../Models/ItemModels";
import AccountTable from "../../Components/OrderDisplay/AccountTable";

const AccountPage: React.FC<ICustomizableComponent> = ({ className }) => {
  const { userId } = useAuth();
  const [orders, setOrders] = useState<IOrder[]>([]);

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

  return (
    <div className={`${className} flex flex-col`}>
      <label className="p-5">Account</label>
      <div className="max-w-full overflow-auto">
        <AccountTable className="px-5" orders={orders} />
      </div>
    </div>
  );
};

export default AccountPage;
