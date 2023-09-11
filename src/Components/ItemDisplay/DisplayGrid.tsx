import { useState } from "react";
import ItemDetailsModal from "./ItemDetailsModal";
import BasicDisplaySix from "./Items/BasicDisplay/BasicDisplaySix";
import RetracableDisplay from "./Items/RetractableDisplay/RetractableDisplay";
import SpinDisplay from "./Items/SpinDisplay/SpinDisplay";

const sampleItemData = [
  {
    name: "Purple Bunny",
    id: "washi_tape_purple_bunny",
    price: "6.99",
    currency: "USD",
    product: "tape",
    onSale: true,
    salePrice: "3.99",
    inStock: true,
    qtyInStock: 99,
  },
  {
    name: "Purple Bunny",
    id: "washi_tape_purple_bunny",
    price: "6.99",
    currency: "USD",
    product: "tape",
    onSale: true,
    salePrice: "3.99",
    inStock: true,
    qtyInStock: 99,
  },
  {
    name: "Purple Bunny",
    id: "washi_tape_purple_bunny",
    price: "6.99",
    currency: "USD",
    product: "tape",
    onSale: true,
    salePrice: "3.99",
    inStock: true,
    qtyInStock: 99,
  },
  {
    name: "Purple Bunny",
    id: "washi_tape_purple_bunny",
    price: "6.99",
    currency: "USD",
    product: "tape",
    onSale: true,
    salePrice: "3.99",
    inStock: true,
    qtyInStock: 99,
  },
];

const DisplayGrid = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="grid grid-cols-2 gap-4 p-4 overflow-y-auto">
      <ItemDetailsModal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
      />
      {sampleItemData.map((item, index) => (
        <BasicDisplaySix
          key={`${item.id}_${index}`}
          item={item}
          onClick={() => setShowModal(true)}
        />
      ))}

      <RetracableDisplay />
      <SpinDisplay />
    </div>
  );
};

export default DisplayGrid;
