import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { httpsCallable } from "firebase/functions";
import { useEffect, useState } from "react";
import { firestore, functions } from "../../Services/FirebaseServices";
import { ICartItem } from "../../Models/ItemModels";
import { useCart } from "../../Services/CartContext";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useAuth } from "../../Services/AuthContext";
import CheckoutForm from "./CheckoutForm";
import { ICustomizableComponent } from "../../Models/ComponentModels";
import CheckoutResults from "./CheckoutResults";
const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_API_KEY);
interface IOrderRequest {
  items: ICartItem[];
  orderId: string;
}

interface IClientSecret {
  clientSecret: string;
}

const CheckoutPage: React.FC<ICustomizableComponent> = ({ className }) => {
  const [clientSecret, setClientSecret] = useState<string>("");
  const [urlSecret, setUrlSecret] = useState<string | null>();
  const { userId } = useAuth();
  const { shoppingCart } = useCart();

  useEffect(() => {
    const doAsyncStuff = async () => {
      //convert shoppingCart items into an object to store
      const order = { orders: shoppingCart };
      console.log("orders", order);
      const orderRef = await addDoc(collection(firestore, "Orders"), order);

      //update the user's doc with their new order number
      const user = userId ? userId : "";
      console.log("user");
      const userRef = doc(firestore, "Users", user);
      if (userRef) {
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          updateDoc(userRef, {
            orders: arrayUnion(orderRef.id),
          });
        } else {
          console.log("no document");
        }
      } else {
        console.log("no user");
      }
      console.log("orderRef", orderRef.id);

      //get the ClientSecret from the database
      const getClientSecret = httpsCallable<IOrderRequest, IClientSecret>(
        functions,
        "getClientSecret"
      );
      const response = await getClientSecret({
        items: shoppingCart,
        orderId: orderRef.id,
      });
      setClientSecret((prevSecret) => {
        console.log("previous secret", prevSecret);
        console.log("updated clientSecret", response.data.clientSecret);
        return response.data.clientSecret;
      });
    };
    doAsyncStuff();
  }, [shoppingCart, userId]);

  useEffect(() => {
    setUrlSecret(
      new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret"
      )
    );
  }, []);

  return (
    <div className={`${className} grid place-content-center p-5`}>
      {clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: clientSecret,
            appearance: { theme: "stripe" },
          }}
        >
          {urlSecret ? (
            <CheckoutResults clientSecret={urlSecret} />
          ) : (
            <CheckoutForm />
          )}
        </Elements>
      )}
    </div>
  );
};

export default CheckoutPage;
