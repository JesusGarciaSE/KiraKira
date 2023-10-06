export interface ICartItem {
  name: string;
  id: string;
  image: string;
  cost: number;
  quantity: number;
}

export interface IOrderRequest {
  items: ICartItem[];
  userId?: string;
}

export interface IStripeItem {
  price: any;
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
}

export interface IAddress {
  city: string;
  country: string;
  line1: string;
  line2?: string;
  postal_code: string;
  state: string;
  name: string;
  default: boolean;
}

export interface IUser {
  orders: IOrderData[];
  addresses: IAddress[];
}
