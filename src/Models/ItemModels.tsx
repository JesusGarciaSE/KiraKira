export interface IItem {
  name: string;
  image: string;
  attributes: string[];
  description: string;
  id: string;
  price: string;
  currency: string;
  category: string;
  onSale: boolean;
  salePrice: string;
  inStock: boolean;
  quantity: number;
}

export interface IUser {
  userID: string;
}

export type DetailsDisplay = { item: IItem };

export type BasicDisplay = { item: IItem } & { onClick(): void };
