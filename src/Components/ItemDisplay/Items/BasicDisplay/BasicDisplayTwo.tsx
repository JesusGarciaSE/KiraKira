import tape from "../../../../assets/ItemImages/tape.webp";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { IconContext } from "react-icons";
import { useState } from "react";
const BasicDisplayTwo = () => {
  const [favorite, setFavorite] = useState(false);
  const updateFavorite = () => {
    setFavorite((prevFavorite) => {
      return !prevFavorite;
    });
  };
  return (
    <div className="flex flex-col">
      <img src={tape} />

      <button className="mb-3 text-xl text-blue-600 rounded-b-full self-center h-12 w-full bg-gradient-to-b from-indigo-300 via-purple-300 to-pink-300">
        Add
      </button>
      <div className="flex flex-row gap-3">
        <p className="flex-1">
          Purple Bunny Washi Tape That goes on things and makes then cute
        </p>
        <IconContext.Provider value={{ color: "red", className: "red-500" }}>
          <div
            className=" h-8 w-8 flex-initial grid content-center rounded-full bg-gradient-to-b from-indigo-300 via-purple-300 to-pink-300"
            onClick={updateFavorite}
          >
            <div className="inline-block mx-auto">
              {favorite ? <AiFillHeart /> : <AiOutlineHeart />}
            </div>
          </div>
        </IconContext.Provider>
      </div>

      <p className=" text-red-600">
        $3.99 <span className="line-through text-gray-500">$6.99</span>
      </p>
    </div>
  );
};

export default BasicDisplayTwo;
