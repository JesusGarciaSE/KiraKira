import { ICartItem, IItem, IOrder } from "./ItemModels";

export interface ICustomizableComponent {
  className?: string;
}

export interface IParentComponent {
  children?: React.ReactNode;
}

export interface IButton extends IParentComponent {
  isDisabled?: boolean;
  className?: string;
  textOptions?: string;
  label?: string;
  onClick?(e: React.MouseEvent): void;
}

export interface BasicDisplay {
  item: IItem;
  onClick(): void;
  onAdd(item: ICartItem): void;
}

export interface IItemModal {
  item: IItem;
  isVisible: boolean;
  onClose(): void;
}

export interface INavigationSidebar extends ICustomizableComponent {
  active?: boolean;
  size?: string;
  color?: string;
  onClick(): void;
}

export interface INavigationSidebar extends ICustomizableComponent {
  active?: boolean;
  size?: string;
  color?: string;
  onClick(): void;
}
export interface INavigationButton extends ICustomizableComponent {
  active?: boolean;
  size?: string;
  color?: string;
  onClick(): void;
}

export interface IOrderDisplayList extends ICustomizableComponent {
  orders: IOrder[];
}
export interface IOrderDisplayItem extends ICustomizableComponent {
  order: IOrder;
}

export interface IOrderDetails extends IOrderDisplayItem {
  clearOrder(): void;
}

export interface IAccountTable extends IOrderDisplayList {
  setOrder(order: IOrder): void;
}