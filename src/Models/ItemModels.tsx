export interface IItem {
  name: string;
  id: string;
  price: string;
  currency: string;
  product: string;
  onSale: boolean;
  salePrice: string;
  inStock: boolean;
  qtyInStock: number;
}

export type BasicDisplay = { item: IItem } & {onClick(): void;};
