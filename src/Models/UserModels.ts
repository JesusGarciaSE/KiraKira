import { IOrder } from "./ItemModels";

export interface IUserAuth {
  email: string;
  password: string;
}

export interface IAddress {
  city: string;
  country: string;
  line1: string;
  line2?: string;
  postal_code: string;
  state: string;
  name?: string;
  default?: boolean;
}

export interface IUser extends IUserAuth {
  orders: IOrder[];
  addresses: IAddress[];
}

export interface IErrors {
  code: string;
  error: string;
}