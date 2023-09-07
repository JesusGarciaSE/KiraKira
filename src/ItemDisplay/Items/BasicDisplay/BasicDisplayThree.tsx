import tape from "../../../assets/ItemImages/tape.webp";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { IconContext } from "react-icons";
import { useState } from "react";
const BasicDisplayThree = () => {
  const [favorite, setFavorite] = useState(false);
  const updateFavorite = () => {
    setFavorite((prevFavorite) => {
      return !prevFavorite;
    });
  };
  return (
    <div className="flex flex-col">
      <div className="text-xl text-blue-600 rounded-t-full self-center h-14 w-full bg-gradient-to-b from-indigo-300 via-purple-300 to-pink-300">
        <p className="text-center mt-2 mb-0">Purple Bunny</p>
        <p className=" text-red-600 text-sm text-center">
          $3.99 <span className="line-through text-gray-500">$6.99</span>
        </p>
      </div>
      <img src={tape} />

      <div className="flex flex-row mb-3">
        <button className="text-xl text-blue-600 rounded-bl-full self-center h-12 w-full bg-gradient-to-b from-indigo-300 via-purple-300 to-pink-300">
          Add
        </button>
        <button
          onClick={updateFavorite}
          className="text-xl text-blue-600 rounded-br-full self-center h-12 w-full bg-gradient-to-b from-indigo-300 via-purple-300 to-pink-300"
        >
          <IconContext.Provider value={{ color: "red", className: "red-500" }}>
            <div className="w-5 h-5 mx-auto">
              {favorite ? <AiFillHeart /> : <AiOutlineHeart />}
            </div>
          </IconContext.Provider>
        </button>
      </div>
    </div>
  );
};

export default BasicDisplayThree;
