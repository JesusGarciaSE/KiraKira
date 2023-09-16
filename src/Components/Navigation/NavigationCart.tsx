import { BsMinecart } from "react-icons/bs";

interface INavigationCart {
  cartSize: number;
}

export const NavigationCart: React.FC<INavigationCart> = ({ cartSize }) => {
  return (
    <div className="relative">
      <p className="absolute text-xl font-semibold text-purple-700 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {cartSize}
      </p>
      <BsMinecart className="text-navIcon h-12 w-12" />
    </div>
  );
};
