interface IItemDetailModal {
  isVisible: boolean;
  onClose(): void;
}

const ItemDetailsModal: React.FC<IItemDetailModal> = ({ isVisible, onClose }) => {
  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm grid place-content-center">
      <div className="flex flex-col">
        <button className="text-white text-xl place-self-end" onClick={onClose}>X</button>
        <div className="bg-white rounded-lg p-2 w-[250px]">
          <div className=" ">asdf</div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailsModal;
