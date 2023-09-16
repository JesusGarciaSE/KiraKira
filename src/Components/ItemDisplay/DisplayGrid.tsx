import { useState } from "react";
import ItemDetailsModal from "./ItemDisplayModal/ItemDetailsModal";
import BasicDisplaySix from "./Items/BasicDisplay/BasicDisplaySix";
import RetracableDisplay from "./Items/RetractableDisplay/RetractableDisplay";
import SpinDisplay from "./Items/SpinDisplay/SpinDisplay";
import { ICartItem, IDisplayGrid, IItem } from "../../Models/ItemModels";
import ItemDetails from "./ItemDisplayModal/ItemDetails";
import { useCart } from "../../Services/CartContext";

const DisplayGrid: React.FC<IDisplayGrid> = ({ products }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IItem | null>(null);
  const { addToCart } = useCart();
  const showItemModal = (item: IItem) => {
    setSelectedItem(item);
    setShowModal(true);
  };
  const closeItemModal = () => {
    setSelectedItem(null); // Clear the selected item
    setShowModal(false);
  };

  const addItemToCart = (item: ICartItem) => {
    console.log("Display Grid addItem To Cart Called, calling addToCart");
    addToCart(item);
  };

  return (
    <div className="grid grid-cols-2 gap-4 p-4 overflow-y-auto">
      <ItemDetailsModal isVisible={showModal} onClose={closeItemModal}>
        {selectedItem && <ItemDetails item={selectedItem} />}
      </ItemDetailsModal>
      {products.map((item, index) => (
        <BasicDisplaySix
          key={`${item.id}_${index}`}
          item={item}
          onClick={() => showItemModal(item)}
          onAdd={addItemToCart}
        />
      ))}

      <RetracableDisplay />
      <SpinDisplay />
    </div>
  );
};

export default DisplayGrid;
