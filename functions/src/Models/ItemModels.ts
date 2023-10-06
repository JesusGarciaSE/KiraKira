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
  user_id?: string;
}
