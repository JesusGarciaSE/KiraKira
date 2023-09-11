import { DetailsDisplay } from "../../../Models/ItemModels";

const ItemDetails: React.FC<DetailsDisplay> = ({ item }) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-3xl text-purple-600">{item.name}</p>
      <p>
        {item.onSale && (
          <span className="text-red-600 text-xl">${item.salePrice}</span>
        )}{" "}
        <span className={`${item.onSale ? "line-through" : ""} text-gray-500`}>
          ${item.price}
        </span>
      </p>
      <img src={item.image} className="rounded-xl"></img>

      <p>{item.description}</p>
      <button className="bg-blue-600 px-5 py-3 rounded-lg text-white place-self-end">
        Add to Cart
      </button>
    </div>
  );
};

export default ItemDetails;
