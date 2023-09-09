import tape from "../../../../assets/ItemImages/tape.webp";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { IconContext } from "react-icons";
import { useState } from "react";
const BasicDisplayOne = () => {
  const [favorite, setFavorite] = useState(false);
  const updateFavorite = () => {
    setFavorite((prevFavorite) => {
      return !prevFavorite;
    });
  };
  return (
    <div className="flex flex-col relative">
      <img src={tape} />
      <IconContext.Provider value={{ color: "red", className: "red-500" }}>
        <div className=" h-8 w-8 grid content-center rounded-full absolute top-3 right-3 bg-gradient-to-b from-indigo-300 via-purple-300 to-pink-300" onClick={updateFavorite}>
          <div className="inline-block mx-auto">{favorite ? <AiFillHeart /> : <AiOutlineHeart />}</div>
        </div>
      </IconContext.Provider>
      <p>Purple Bunny Washi Tape That goes on things and makes then cute</p>
      <p className=" text-red-600">$3.99 <span className="line-through text-gray-500">$6.99</span></p>
      <button className=" text-xl text-blue-600 rounded-full self-center h-12 w-32 bg-gradient-to-b from-indigo-300 via-purple-300 to-pink-300">Add</button>
    </div>
  );
};

export default BasicDisplayOne;
