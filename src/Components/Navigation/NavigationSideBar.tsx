import { GiNinjaStar } from "react-icons/gi";
import { Link } from "react-router-dom";

interface INavigationSideBar {
  className?: string;
  active?: boolean;
  size?: string;
  color?: string;
  onClick(): void;
}

const pages = ["Home", "Deals", "New", "Tape"];

const NavigationSideBar: React.FC<INavigationSideBar> = ({
  className,
  active,
  color,
  onClick,
}) => {
  const sidebarStyle = {
    transform: active ? "translateX(0)" : "translateX(-100%)",
    transition: "transform 0.3s ease-in-out",
  };
  return (
    <div
      className={`flex flex-col min-h-screen min-w-full p-3 text-2xl text-center ${className} ${color}`}
      style={sidebarStyle}
    >
      <div className="flex flex-row">
        <GiNinjaStar className="text-red-400 h-12 w-12" onClick={onClick} />
        <div className="grid content-center flex-1">
          <p>KiraKira</p>
        </div>
      </div>
      <ul className="flex-grow">
        {pages.map((page, index) => (
          <Link to={page.toLowerCase()} key={`${index}_${page}`}>
            <li className="py-3">
              {page}
            </li>
          </Link>
        ))}
      </ul>
      <p className="text-sm">KiraKira, LLC 2023</p>
    </div>
  );
};

export default NavigationSideBar;
