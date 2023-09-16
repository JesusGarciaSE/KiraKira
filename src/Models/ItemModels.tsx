export interface IItem {
  id: string;
  name: string;
  image: string;
  price: string;
  onSale: boolean;
  salePrice: string;
  description: string;
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
