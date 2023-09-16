import { AiOutlineCloseCircle } from "react-icons/ai";
import { IItemDetailModal } from "../../../Models/ItemModels";

const ItemDetailsModal: React.FC<IItemDetailModal> = ({
  isVisible,
  onClose,
  children,
}) => {
  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm grid place-content-center">
      <div className="bg-pink-400 relative rounded-lg p-5 m-5">
        <button className="absolute top-3 right-3" onClick={onClose}>
          <AiOutlineCloseCircle className="h-12 w-12 text-purple-500" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default ItemDetailsModal;
