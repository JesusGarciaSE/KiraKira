import { useParams } from "react-router-dom";
import DisplayGrid from "../../Components/ItemDisplay/DisplayGrid";
import { useEffect, useState } from "react";
import { IItem } from "../../Models/ItemModels";
import { useCatalogue } from "../../Services/CatalogueContext";

interface ICollectionsPage {
  route: "new" | "sale" | "product";
}

const CollectionsPage: React.FC<ICollectionsPage> = ({ route }) => {
  const [productList, setProductList] = useState<IItem[]>([]);
  const { category } = useParams();
  const { catalogue } = useCatalogue();

  useEffect(() => {
    setProductList(filterProducts(route));
  }, [route]);

  const filterProducts = (route: string): IItem[] => {
    switch (route) {
      case "new":
        return [
          ...catalogue.Bookmarks.filter((item) =>
            item.attributes.includes("new")
          ),
          ...catalogue.Magnets.filter((item) =>
            item.attributes.includes("new")
          ),
          ...catalogue.Stickers.filter((item) =>
            item.attributes.includes("new")
          ),
        ];
      case "sale":
        return [
          ...catalogue.Bookmarks.filter((item) => item.onSale),
          ...catalogue.Magnets.filter((item) => item.onSale),
          ...catalogue.Stickers.filter((item) => item.onSale),
        ];
        break;
      case "product":
        switch (category) {
          case "bookmark":
            return [...catalogue.Bookmarks];
          case "magnet":
            return [...catalogue.Magnets];
          case "sticker":
            return [...catalogue.Stickers];
        }
        break;

      default:
        return [];
    }
    return [];
  };

  return <DisplayGrid products={productList} />;
};

export default CollectionsPage;
