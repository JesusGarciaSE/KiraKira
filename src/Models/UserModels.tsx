export interface IUserAuth {
  email: string;
  password: string;
}

export interface IOrder {
  orderNumber: string;
  orderDate: string;
  paymentStatus: string;
  fulfillmentStatus: string;
  total: string;
}

export interface IAddress {
  name: string;
  streetOne: string;
  streetTwo?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  default: string;
}

export interface IUser extends IUserAuth {
  orders: IOrder[];
  addresses: IAddress[];
}

export interface IErrors {
  code: string;
  error: string;
}