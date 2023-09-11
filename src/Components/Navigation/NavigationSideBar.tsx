import { GiNinjaStar } from "react-icons/gi";
import { Link } from "react-router-dom";
import logo from "../../assets/SiteImages/Kirakira_logo_placeholder.png";

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
  return (
    <div
      className={`flex flex-col min-h-screen min-w-full p-3 text-2xl text-center ease-in-out duration-300 ${className} ${color} ${active ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <div className="flex flex-row">
        <GiNinjaStar className="text-red-400 h-12 w-12" onClick={onClick} />
        <div className="grid content-center flex-1 relative">
          <img loading="lazy" src={logo} alt="Logo"/>
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl font-custom text-transparent bg-clip-text bg-clip bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">KiraKira</p>
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
