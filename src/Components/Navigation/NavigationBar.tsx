import { useState } from "react";
import NavigationButton from "./NavigationButton";

const NavigationBar = () => {
  const [active, setActive] = useState(false);

  const toggleMenu = (): void => {
    setActive((prevActive) => {
      return !prevActive;
    });
  };
  return (
    <div className=" flex flex-row justify-evenly bg-slate-500">
        <NavigationButton
          className="p-3 border border-solid border-black"
          size="h-12 w-12"
          color="text-blue-400"
          active={active}
          onClick={toggleMenu}
        />
        <p className="m-auto">Title</p>
        <div className="my-auto"><p>end</p></div>
    </div>
  );
};

export default NavigationBar;
