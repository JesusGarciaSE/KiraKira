import { GiNinjaStar } from "react-icons/gi";

interface INavigationSideBar {
  className?: string;
  active?: boolean;
  size?: string;
  color?: string;
  onClick(): void;
}

const NavigationSideBar: React.FC<INavigationSideBar> = ({
  className,
  active,
  color,
  onClick
}) => {
    const sidebarStyle = {
        transform: active ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.3s ease-in-out",
      };
  return (
    <div
      className={`min-h-screen min-w-half p-3 ${className} ${color}`}
      style={sidebarStyle}
    >
      <div className="flex flex-row">
        <GiNinjaStar class="text-red-400 h-12 w-12" onClick={onClick}/>
        <div className="grid content-center flex-1">
          <p className="text-2xl text-center">KiraKira</p>
        </div>
      </div>
    </div>
  );
};

export default NavigationSideBar;
