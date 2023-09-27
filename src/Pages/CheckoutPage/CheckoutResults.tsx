import { ICustomizableComponent } from "../../Models/ComponentModels";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { PaymentIntentResult } from "@stripe/stripe-js";
import { useStripe } from "@stripe/react-stripe-js";

interface ICheckoutResults extends ICustomizableComponent {
  clientSecret: string;
}

const CheckoutResults: React.FC<ICheckoutResults> = ({
  className,
  clientSecret,
}) => {
  const stripe = useStripe();
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    if (!stripe) {
      return;
    }
    if (!clientSecret) {
      return;
    }
    stripe
      .retrievePaymentIntent(clientSecret)
      .then(({ paymentIntent }: PaymentIntentResult) => {
        if (!paymentIntent) {
          return;
        }
        switch (paymentIntent.status) {
          case "succeeded":
            setMessage("Checkout completed!");
            break;
          case "processing":
            setMessage("Your payment is processing.");
            break;
          case "requires_payment_method":
            setMessage("Your payment was not successful, please try again.");
            break;
          default:
            setMessage("Checkout Error, something went wrong.");
            break;
        }
      });
  }, [stripe, clientSecret]);
  return (
    <div className={`${className} grid content-center bg-rose-400 p-4`}>
      <div className="bg-purple-800 rounded-xl p-4">
        <div className="mx-auto mb-4 ">
          {message === "Checkout completed!" ? (
            <div>
              <AiOutlineCheckCircle className="h-24 w-24 mx-auto text-green-600" />
              <p className="text-center font-bold text-2xl text-green-500 underline decoration-green-600">
                {message}
              </p>
            </div>
          ) : (
            <div>
              <AiOutlineCloseCircle className="h-24 w-24 mx-auto text-red-600" />
              <p className="text-center font-bold text-2xl text-red-500 underline decoration-red-600">
                {message}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutResults;
