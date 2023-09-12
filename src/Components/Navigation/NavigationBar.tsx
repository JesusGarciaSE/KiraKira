import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineAccountCircle } from "react-icons/md";
import NavigationSidebar from "./NavigationSideBar";
import logo from "../../assets/SiteImages/Kirakira_logo_placeholder_line.png";
import UserNavigation from "./UserNavigation";

const NavigationBar = () => {
  const [active, setActive] = useState(false);
  const [userNavActive, setUserNavActive] = useState(false);

  const toggleMenu = (): void => {
    setActive((prevActive) => {
      return !prevActive;
    });
  };
  const toggleUserMenu = ():void => {
    setUserNavActive((prevUserNavActive) => {
      return !prevUserNavActive;
    })
  }

  return (
    <div className=" flex flex-row justify-around bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300">
      <div className="pl-3 my-auto" onClick={toggleMenu}>
        <GiHamburgerMenu className="text-blue-600 h-12 w-12" />
      </div>
      <div className="w-48 mx-auto relative">
        <img
          className="max-h-full max-w-full"
          src={logo}
          alt="Linear alternate logo"
        />
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-custom text-transparent bg-clip-text bg-clip bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-700">KiraKira</p>
      </div>
      <div className="pr-3 my-auto" onClick={toggleUserMenu}>
        <MdOutlineAccountCircle className="text-blue-600 h-12 w-12" />
      </div>
      <NavigationSidebar
        className="bg-red-300"
        color="bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300"
        active={active}
        onClick={toggleMenu}
      />
      <UserNavigation
        className="bg-red-300"
        color="bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300"
        active={userNavActive}
        onClick={toggleUserMenu}
      />
    </div>
  );
};

export default NavigationBar;
