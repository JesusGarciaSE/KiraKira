export interface IItem {
  id: string;
  name: string;
  image: string;
  price: number;
  onSale: boolean;
  salePrice: number;
  description: string;
}

export interface IUser {
  userID: string;
}

export interface ICartItem {
  name: string;
  id: string;
  image: string;
  cost: number;
  quantity: number;
}

export interface IDisplayGrid {
  products: IItem[];
}

export interface BasicDisplay {
  item: IItem;
  onClick(): void;
  onAdd(item: ICartItem): void;
}

export interface IItemModal {
  item: IItem;
  isVisible: boolean;
  onClose(): void;
}
