import { GiHamburgerMenu, GiNinjaStar } from "react-icons/gi";

interface INavigationButton {
  className?: string;
  active?: boolean;
  size?: string;
  color?: string;
  onClick(): void;
}

const NavigationButton: React.FC<INavigationButton> = ({
  className,
  active,
  size,
  color,
  onClick
}) => {
  return (
    <div className={` ${className}`} onClick={onClick}>
      {active ? (
        <GiHamburgerMenu class={`${size} ${color}`} />
      ) : (
        <GiNinjaStar class={`${size} ${color}`} />
      )}
    </div>
  );
};

export default NavigationButton;
