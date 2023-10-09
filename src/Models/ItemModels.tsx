import { IAddress } from "./UserModels";

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

export interface IOrder {
  order_id: string;
  items: ICartItem[];
  paymentStatus: boolean;
  fulfillmentStatus: boolean;
  created: number;
  subtotal: number;
  total: number;
  ch_session_id: string;
  user_id?: string;
  shipping_address?: IAddress;
  billing_address?: IAddress;
}