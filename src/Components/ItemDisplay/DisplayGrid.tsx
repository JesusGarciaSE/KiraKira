import { useEffect, useState } from "react";
import ItemDetailsModal from "./ItemDisplayModal/ItemDetailsModal";
import BasicDisplaySix from "./Items/BasicDisplay/BasicDisplaySix";
import RetracableDisplay from "./Items/RetractableDisplay/RetractableDisplay";
import SpinDisplay from "./Items/SpinDisplay/SpinDisplay";
import { IItem } from "../../Models/ItemModels";
import ItemDetails from "./ItemDisplayModal/ItemDetails";
import { firestore } from "../../Services/FirebaseServices";
import { collection, getDocs, query, where } from "firebase/firestore";


interface IDisplayGrid {
  category: string;
}

const DisplayGrid: React.FC<IDisplayGrid> = ({ category }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IItem | null>(null);
  const [productList, setProductList] = useState<IItem[]>([]);
  const showItemModal = (item: IItem) => {
    setSelectedItem(item);
    setShowModal(true);
  };
  const closeItemModal = () => {
    setSelectedItem(null); // Clear the selected item
    setShowModal(false);
  };

  useEffect(() => {
    const queryProducts = query(
      collection(firestore, "Products"),
      where("category", "==", "correction tape")
    );
    const products: IItem[] = [];
    const querySnapshot = getDocs(queryProducts);
    querySnapshot.then((response) => {
      response.docs.forEach((doc) => {
        console.log(doc.data())
        if (doc.data) {
          products.push(doc.data() as IItem);
        }
      });

      setProductList(products);
    });
  }, [category]);
  return (
    <div className="grid grid-cols-2 gap-4 p-4 overflow-y-auto">
      <ItemDetailsModal isVisible={showModal} onClose={closeItemModal}>
        {selectedItem && <ItemDetails item={selectedItem} />}
      </ItemDetailsModal>
      {productList.map((item, index) => (
        <BasicDisplaySix
          key={`${item.id}_${index}`}
          item={item}
          onClick={() => showItemModal(item)}
        />
      ))}

      <RetracableDisplay />
      <SpinDisplay />
    </div>
  );
};

export default DisplayGrid;
