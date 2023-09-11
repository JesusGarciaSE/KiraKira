import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineAccountCircle } from "react-icons/md";
import NavigationSidebar from "./NavigationSideBar";
import logo from "../../assets/SiteImages/Kirakira_logo_placeholder_line.png";

const NavigationBar = () => {
  const [active, setActive] = useState(false);

  const toggleMenu = (): void => {
    setActive((prevActive) => {
      if (!prevActive) {
        document.body.classList.add("overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
      }
      return !prevActive;
    });
  };
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
      <div className="pr-3 my-auto" onClick={toggleMenu}>
        <MdOutlineAccountCircle className="text-blue-600 h-12 w-12" />
      </div>
      <NavigationSidebar
        className="absolute top-0 left-0 z-20 bg-red-300"
        color="bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300"
        active={active}
        onClick={toggleMenu}
      />
    </div>
  );
};

export default NavigationBar;
