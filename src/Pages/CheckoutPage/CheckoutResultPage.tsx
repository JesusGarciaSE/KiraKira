import { useParams } from "react-router-dom";
import { ICustomizableComponent } from "../../Models/ComponentModels";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

const CheckoutResultPage: React.FC<ICustomizableComponent> = ({ className }) => {
  const { result } = useParams();

  return (
    <div className={`${className} grid content-center bg-rose-400 p-4`}>
      <div className="bg-purple-800 rounded-xl p-4">
        <div className="mx-auto mb-4 ">
          {result === "success" ? (
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
                Checkout Error!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutResultPage;
