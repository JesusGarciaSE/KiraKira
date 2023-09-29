import { ICustomizableComponent } from "../../Models/ComponentModels";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
// import { useEffect, useState } from "react";
// import { PaymentIntentResult } from "@stripe/stripe-js";
// import { useStripe } from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";

const CheckoutResults: React.FC<ICustomizableComponent> = ({className}) => {
  // const stripe = useStripe();
  // const [message, setMessage] = useState<string>();
  const { result } = useParams();
  // useEffect(() => {
  //   if (!stripe) {
  //     return;
  //   }
  //   if (!clientSecret) {
  //     return;
  //   }
  //   stripe
  //     .retrievePaymentIntent(clientSecret)
  //     .then(({ paymentIntent }: PaymentIntentResult) => {
  //       if (!paymentIntent) {
  //         return;
  //       }
  //       switch (paymentIntent.status) {
  //         case "succeeded":
  //           setMessage("Checkout completed!");
  //           break;
  //         case "processing":
  //           setMessage("Your payment is processing.");
  //           break;
  //         case "requires_payment_method":
  //           setMessage("Your payment was not successful, please try again.");
  //           break;
  //         default:
  //           setMessage("Checkout Error, something went wrong.");
  //           break;
  //       }
  //     });
  // }, [stripe, clientSecret]);
  return (
    <div className={`${className} grid content-center bg-rose-400 p-4`}>
      <div className="bg-purple-800 rounded-xl p-4">
        <div className="mx-auto mb-4 ">
          {result ? (
            <div>
              <AiOutlineCheckCircle className="h-24 w-24 mx-auto text-green-600" />
              <p className="text-center font-bold text-2xl text-green-500 underline decoration-green-600">
                Checkout completed!
              </p>
            </div>
          ) : (
            <div>
              <AiOutlineCloseCircle className="h-24 w-24 mx-auto text-red-600" />
              <p className="text-center font-bold text-2xl text-red-500 underline decoration-red-600">
                Error, please try again.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutResults;
