import tape from "../../../../assets/ItemImages/tape.webp";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useState } from "react";

const sampleItemData = {
  name: "Purple Bunny",
  id: "washi_tape_purple_bunny",
  price: "6.99",
  currency: "USD",
  product: "tape",
  onSale: true,
  salePrice: "3.99",
  inStock: true,
  qtyInStock: 99,
};

const BasicDisplaySix = () => {
  const [favorite, setFavorite] = useState(false);
  const updateFavorite = () => {
    setFavorite((prevFavorite) => {
      return !prevFavorite;
    });
  };
  return (
    <div className="flex flex-col">
      <div className="text-xl text-blue-600 rounded-t-xl self-center h-16 w-full bg-gradient-to-b from-indigo-300 via-purple-300 to-pink-300">
        <p className="text-center mt-2 mb-0">{sampleItemData.name}</p>
        <p className="text-sm text-center">
          {sampleItemData.onSale && (
            <span className="text-red-600 text-sm">
              ${sampleItemData.salePrice}
            </span>
          )}{" "}
          <span
            className={`${
              sampleItemData.onSale ? "line-through" : ""
            } text-gray-500`}
          >
            ${sampleItemData.price}
          </span>
        </p>
      </div>
      <img src={tape} />

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
