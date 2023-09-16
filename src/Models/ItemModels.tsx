import { IParentComponent } from "./ComponentModels";

export interface IItem {
  name: string;
  image: string;
  attributes: string[];
  description: string;
  id: string;
  price: string;
  currency: string;
  category: string;
  onSale: boolean;
  salePrice: string;
  inStock: boolean;
  quantity: number;
}

export interface IUser {
  userID: string;
}

export interface ICartItem {
  name: string;
  id: string;
  image: string;
  cost: string;
  quantity: number;
}

export interface IDisplayGrid {
  products: IItem[];
}

export interface DetailsDisplay {
  item: IItem;
}

export interface IItemSimplified {
  name: string;
  id: string;
  image: string;
  cost: string;
  quantity: number;
}

export type BasicDisplay = { item: IItem } & {
  onClick(): void;
  onAdd(item: ICartItem): void;
};

export interface IItemDetailModal extends IParentComponent {
  isVisible: boolean;
  onClose(): void;
}
