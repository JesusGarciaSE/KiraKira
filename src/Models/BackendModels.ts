import { ICartItem } from "./ItemModels";
import { IAddress } from "./UserModels";

export interface IOrderRequest {
    items: ICartItem[];
    userId?: string;
  }
  
  export interface IStripeItem {
    price: string;
    quantity: number;
  }
  
  export interface IOrderData {
    items: ICartItem[];
    paymentStatus: boolean;
    fulfillmentStatus: boolean;
    created: number;
    total: number;
    subtotal: number;
    ch_session_id: string;
    order_id?: string;
    user_id?: string;
    shipping_address?: IAddress;
    billing_address?: IAddress;
  }