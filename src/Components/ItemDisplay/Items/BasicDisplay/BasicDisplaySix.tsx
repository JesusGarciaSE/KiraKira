import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useState } from "react";
import { BasicDisplay, ICartItem } from "../../../../Models/ItemModels";

const BasicDisplaySix: React.FC<BasicDisplay> = ({ item, onClick, onAdd }) => {
  const [favorite, setFavorite] = useState(false);
  const updateFavorite = () => {
    setFavorite((prevFavorite) => {
      return !prevFavorite;
    });
  };
  const handleAddClick = () => {
    
    const cartItem: ICartItem = {
      name: item.name,
      id: item.id,
      image: item.image,
      cost: item.onSale ? item.salePrice : item.price,
      quantity: 1,
    };
    console.log('Basid Display Calling OnAdd passing Item');
    onAdd(cartItem);
  };
  return (
    <div className="flex flex-col rounded-xl overflow-hidden shadow-lg shadow-purple-500">
      <div
        className="flex-1 grid place-content-center text-xl text-displayLabel self-center h-content py-2 w-full bg-gradient-to-b from-kira-bg-start via-kira-bg-through to-kira-bg-end"
        onClick={onClick}
      >
        <p className="text-center">{item.name}</p>
        <p className="text-sm text-center">
          {item.onSale && (
            <span className="text-saleHighlight text-sm">
              ${item.salePrice/100}
            </span>
          )}{" "}
          <span
            className={`${item.onSale ? "line-through" : ""} text-saleMarkdown`}
          >
            ${item.price/100}
          </span>
        </p>
      </div>
      <img onClick={onClick} src={item.image} />
      <div className="flex flex-row">
        <button
          className="text-xl text-displayLabel self-center h-12 w-full bg-gradient-to-b from-kira-bg-start via-kira-bg-through to-kira-bg-end"
          onClick={handleAddClick}
        >
          Add
        </button>
        <button
          onClick={updateFavorite}
          className="h-12 w-full bg-gradient-to-b from-kira-bg-start via-kira-bg-through to-kira-bg-end"
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
