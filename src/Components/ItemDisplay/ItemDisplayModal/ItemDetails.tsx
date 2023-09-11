import { DetailsDisplay } from "../../../Models/ItemModels";

export interface IItem {
  name: string;
  id: string;
  price: string;
  currency: string;
  product: string;
  onSale: boolean;
  salePrice: string;
  inStock: boolean;
  qtyInStock: number;
}

const ItemDetails: React.FC<DetailsDisplay> = ({ item }) => {
  return (
    <div>
      <div>{item.name}</div>
      <div>{item.price}</div>
      <div>{item.product}</div>
      {item.onSale && <div>{item.salePrice}</div>}
    </div>
  );
};

export default ItemDetails;
