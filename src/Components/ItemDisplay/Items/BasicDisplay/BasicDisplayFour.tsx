import tape from "../../../../assets/ItemImages/tape.webp";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { LiaShoppingBasketSolid } from "react-icons/lia";
import { BsFillShareFill } from "react-icons/bs";
import { IconContext } from "react-icons";
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

const BasicDisplayFour = () => {
  const [favorite, setFavorite] = useState(false);
  const updateFavorite = () => {
    setFavorite((prevFavorite) => {
      return !prevFavorite;
    });
  };
  return (
    <div className="flex flex-col rounded-t-xl overflow-hidden">
      <img src={tape} />
      <div className="flex flex-row justify-between">
        <p className="text-lg font-extrabol my-auto ml-3">
          {sampleItemData.onSale && <span>${sampleItemData.salePrice}</span>}{" "}
          <span
            className={`${
              sampleItemData.onSale ? "line-through font-normal text-base" : ""
            } text-gray-500`}
          >
            ${sampleItemData.price}
          </span>
        </p>
        <div className="flex flex-row">
          <button onClick={updateFavorite} className="">
            <IconContext.Provider
              value={{ color: "red", className: "red-500 h-6 w-6 my-3" }}
            >
              {favorite ? <AiFillHeart /> : <AiOutlineHeart />}
            </IconContext.Provider>
          </button>
          <BsFillShareFill class="text-black h-4 w-4 my-4" />
        </div>
      </div>
      <p className="text-start">{sampleItemData.name}</p>
      <button className="flex flex-row justify-between px-4 pt-2 text-xl text-blue-600 rounded-lg self-center h-12 w-full border-solid border-black border-2">
        Add
        <LiaShoppingBasketSolid class="text-black mt-1" />
      </button>
    </div>
  );
};

export default BasicDisplayFour;
