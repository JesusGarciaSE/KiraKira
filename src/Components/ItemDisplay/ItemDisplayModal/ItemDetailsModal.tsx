import { AiOutlineCloseCircle } from "react-icons/ai";
import { IItemModal } from "../../../Models/ItemModels";

const ItemDetailsModal: React.FC<IItemModal> = ({
  item,
  isVisible,
  onClose,
}) => {
  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm grid place-content-center">
      <div className="bg-pink-400 relative rounded-lg p-5 m-5 overflow-x-hidden overflow-y-auto">
        <button className="absolute top-3 right-3" onClick={onClose}>
          <AiOutlineCloseCircle className="h-12 w-12 text-purple-500" />
        </button>
        <div className="flex flex-col gap-2">
          <p className="text-3xl text-purple-600">{item.name}</p>
          <p>
            {item.onSale && (
              <span className="text-red-600 text-xl">${item.salePrice}</span>
            )}{" "}
            <span
              className={`${item.onSale ? "line-through" : ""} text-gray-500`}
            >
              ${item.price}
            </span>
          </p>
          <img src={item.image} className="rounded-xl"></img>

          <p>{item.description}</p>
          <button className="bg-blue-600 px-5 py-3 rounded-lg text-white place-self-end">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailsModal;
