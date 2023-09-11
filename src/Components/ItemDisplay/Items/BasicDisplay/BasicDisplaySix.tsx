import tape from "../../../../assets/ItemImages/tape.webp";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useState } from "react";
import { BasicDisplay } from "../../../../Models/ItemModels";

const BasicDisplaySix: React.FC<BasicDisplay> = ({ item, onClick }) => {
  const [favorite, setFavorite] = useState(false);
  const updateFavorite = () => {
    setFavorite((prevFavorite) => {
      return !prevFavorite;
    });
  };
  return (
    <div className="flex flex-col">
      <div onClick={onClick}>
        <div className="text-xl text-blue-600 rounded-t-xl self-center h-16 w-full bg-gradient-to-b from-indigo-300 via-purple-300 to-pink-300">
          <p className="text-center mt-2 mb-0">{item.name}</p>
          <p className="text-sm text-center">
            {item.onSale && (
              <span className="text-red-600 text-sm">${item.salePrice}</span>
            )}{" "}
            <span
              className={`${item.onSale ? "line-through" : ""} text-gray-500`}
            >
              ${item.price}
            </span>
          </p>
        </div>
        <img src={tape} />
      </div>

      <div className="flex flex-row">
        <button className="text-xl text-blue-600 rounded-bl-xl self-center h-12 w-full bg-gradient-to-b from-indigo-300 via-purple-300 to-pink-300">
          Add
        </button>
        <button
          onClick={updateFavorite}
          className="text-xl text-blue-600 rounded-br-xl self-center h-12 w-full bg-gradient-to-b from-indigo-300 via-purple-300 to-pink-300"
        >
          <div className="w-5 h-5 mx-auto">
            {favorite ? (
              <AiFillHeart className="text-red-600 h-6 w-6" />
            ) : (
              <AiOutlineHeart className="text-red-600 h-6 w-6" />
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default BasicDisplaySix;
