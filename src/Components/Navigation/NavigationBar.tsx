import { useState } from "react";
import { GiHamburgerMenu, GiScrollQuill } from "react-icons/gi";
import { MdOutlineAccountCircle } from "react-icons/md";
import NavigationSidebar from "./NavigationSideBar";
import logo from "../../assets/SiteImages/Kirakira_logo_placeholder_line.png";
import UserNavigation from "./UserNavigation";
import { useAuth } from "../../Services/AuthContext";
import { useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const [active, setActive] = useState(false);
  const [userNavActive, setUserNavActive] = useState(false);
  const { loggedIn } = useAuth();
const navigate = useNavigate();
  const toggleMenu = (): void => {
    setActive((prevActive) => {
      return !prevActive;
    });
  };
  const toggleUserMenu = (): void => {
    setUserNavActive((prevUserNavActive) => {
      return !prevUserNavActive;
    });
  };

  const handleAccountClick = () => {
    loggedIn ? toggleUserMenu() : navigate("/signup")
  };

  return (
    <div className="flex flex-row justify-around shadow-md shadow-purple-800">
      <div className="pl-3 my-auto" onClick={toggleMenu}>
        <GiHamburgerMenu className="text-navIcon h-12 w-12" />
      </div>
      <div className="w-48 mx-auto relative">
        <img
          className="max-h-full max-w-full"
          src={logo}
          alt="Linear alternate logo"
        />
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-custom text-transparent bg-clip-text bg-clip bg-gradient-to-br from-kira-hlogo-start via-kira-hlogo-through to-kira-hlogo-end">
          KiraKira
        </p>
      </div>
      <div className="pr-3 my-auto" onClick={handleAccountClick}>
        {loggedIn ? (
          <MdOutlineAccountCircle className="text-navIcon h-12 w-12" />
        ) : (
          <GiScrollQuill className="text-navIcon h-12 w-12" />
        )}
      </div>
      <NavigationSidebar
        color=" bg-gradient-to-br from-kira-bg-start via-kira-bg-through to-kira-bg-end"
        active={active}
        onClick={toggleMenu}
      />
      <UserNavigation
        color="bg-gradient-to-br from-kira-bg-start via-kira-bg-through to-kira-bg-end"
        active={userNavActive}
        onClick={toggleUserMenu}
      />
    </div>
  );
};

export default NavigationBar;
