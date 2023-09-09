import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import NavigationSideBar from "./NavigationSideBar";

const NavigationBar = () => {
  const [active, setActive] = useState(false);

  const toggleMenu = (): void => {
    setActive((prevActive) => {
      return !prevActive;
    });
  };
  return (
    <div className=" flex flex-row justify-evenly bg-slate-500">
      <div className="p-3" onClick={toggleMenu}>
        <GiHamburgerMenu class="text-blue-300 h-12 w-12" />
      </div>
      <p className="m-auto">Title</p>
      <div className="my-auto">
        <p>end</p>
      </div>
      <NavigationSideBar
        className="absolute top-0 left-0 z-20 bg-red-300"
        color="bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300"
        active={active}
        onClick={toggleMenu}
      />
    </div>
  );
};

export default NavigationBar;
