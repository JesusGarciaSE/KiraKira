import { IOrder } from "./ItemModels";

export interface IUserAuth {
  email: string;
  password: string;
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