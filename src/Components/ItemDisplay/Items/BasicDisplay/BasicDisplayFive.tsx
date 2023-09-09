import tape from "../../../assets/ItemImages/tape.webp";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { LiaShoppingBasketSolid } from "react-icons/lia";
import { useState } from "react";

const sampleItemData = {
  name: "Purple Bunny Washi Tape",
  id: "washi_tape_purple_bunny",
  price: "6.99",
  currency: "USD",
  product: "tape",
  onSale: true,
  salePrice: "3.99",
  inStock: true,
  qtyInStock: 99,
};

const BasicDisplayFive = () => {
  const [favorite, setFavorite] = useState(false);
  const updateFavorite = () => {
    setFavorite((prevFavorite) => {
      return !prevFavorite;
    });
  };
  return (
    <div className="flex flex-col">
      <img src={tape} />
      <button className="flex flex-row justify-between my-4 px-4 pt-2 text-xl text-blue-600 rounded-lg self-center h-12 w-full border-solid border-black border-2">
        Add
        <LiaShoppingBasketSolid class="text-black mt-1" />
      </button>
      <div className="flex flex-row justify-between">
        <p className="text-start">{sampleItemData.name}</p>
        <button onClick={updateFavorite} className="px-2">
          {favorite ? (
            <AiFillHeart class="text-red-500 h-6 w-6" />
          ) : (
            <AiOutlineHeart class="text-red-500 h-6 w-6" />
          )}
        </button>
      </div>
      <p className="text-lg">
        <span
          className={`${
            sampleItemData.onSale ? "line-through decoration-red-600" : ""
          }`}
        >
          {"$" + sampleItemData.price}
        </span>
        {sampleItemData.onSale && (
          <span className="text-red-600 ml-2">
            {"$" + sampleItemData.salePrice}
          </span>
        )}
      </p>
    </div>
  );
};

export default BasicDisplayFive;
