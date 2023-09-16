export interface ICustomizableComponent {
  className: string;
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
