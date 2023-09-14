import { GiNinjaStar } from "react-icons/gi";
import logo from "../../assets/SiteImages/Kirakira_logo_placeholder.png";
import { Link } from "react-router-dom";

interface INavigationSidebar {
  className?: string;
  active?: boolean;
  size?: string;
  color?: string;
  onClick(): void;
}

const pages = [
  { route: "home", label: "Home" },
  {
    route: "new",
    label: "New",
  },
  {
    route: "sale",
    label: "On Sale",
  },
  {
    route: "product",
    label: "Stickers",
    params: "sticker",
  },
  {
    route: "product",
    label: "Magnets",
    params: "magnet",
  },
  {
    route: "product",
    label: "Bookmarks",
    params: "bookmark",
  },
];
const NavigationSidebar: React.FC<INavigationSidebar> = ({
  className,
  active,
  color,
  onClick,
}) => {
  return (
    <div
      className={`z-10 flex flex-col fixed min-h-screen min-w-full p-3 text-2xl text-center ease-in-out duration-300 ${className} ${color} ${
        active ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="relative">
        <GiNinjaStar
          className="absolute z-20 text-navClose h-12 w-12"
          onClick={onClick}
        />
        <div className="grid content-center flex-1 relative">
          <div className="h-48 mx-auto">
            <img
              loading="lazy"
              className="max-h-full max-w-full"
              src={logo}
              alt="Logo"
            />
          </div>
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl font-custom text-transparent bg-clip-text bg-clip bg-gradient-to-br from-kira-slogo-start via-kira-slogo-through to-kira-slogo-end">
            KiraKira
          </p>
        </div>
      </div>
      <ul className={`flex-grow`}>
        {pages.map((page, index) => (
          <Link
            to={`${page.route}\\${page.params ? page.params : ""}`}
            onClick={onClick}
            key={`${index}_${page}`}
          >
            <li className="py-3">{page.label}</li>
          </Link>
        ))}
      </ul>
      <p className="text-sm">KiraKira, LLC 2023</p>
    </div>
  );
};

export default NavigationSidebar;
