export interface IItem {
  id: string;
  name: string;
  image: string;
  price: number;
  onSale: boolean;
  salePrice: number;
  description: string;
}

export interface IShoppingCart {
  items: ICartItem[];
  userId?: string;
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

