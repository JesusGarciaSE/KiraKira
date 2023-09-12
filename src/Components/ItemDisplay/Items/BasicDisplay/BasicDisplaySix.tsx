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
        <div className="text-xl text-displayLabel rounded-t-xl self-center h-16 w-full bg-gradient-to-b from-kira-bg-start via-kira-bg-through to-kira-bg-end">
          <p className="text-center mt-2 mb-0">{item.name}</p>
          <p className="text-sm text-center">
            {item.onSale && (
              <span className="text-saleHighlight text-sm">${item.salePrice}</span>
            )}{" "}
            <span
              className={`${item.onSale ? "line-through" : ""} text-saleMarkdown`}
            >
              ${item.price}
            </span>
          </p>
        </div>
        <img src={item.image} />
      </div>

      <div className="flex flex-row">
        <button className="text-xl text-displayLabel rounded-bl-xl self-center h-12 w-full bg-gradient-to-b from-kira-bg-start via-kira-bg-through to-kira-bg-end">
          Add
        </button>
        <button
          onClick={updateFavorite}
          className="rounded-br-xl h-12 w-full bg-gradient-to-b from-kira-bg-start via-kira-bg-through to-kira-bg-end"
        >
          <div className="w-5 h-5 mx-auto">
            {favorite ? (
              <AiFillHeart className="text-favoriteFill h-6 w-6" />
            ) : (
              <AiOutlineHeart className="text-favoriteFill h-6 w-6" />
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default BasicDisplaySix;
