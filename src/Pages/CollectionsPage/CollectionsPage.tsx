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
    switch (route) {
      case "new":
        setProductList([
          ...catalogue.Bookmarks.filter((item) => item.onSale),
          ...catalogue.Magnets.filter((item) => item.onSale),
          ...catalogue.Stickers.filter((item) => item.onSale),
        ]);
        break;
      case "sale":
        setProductList([
          ...catalogue.Bookmarks.filter((item) =>
            item.attributes.includes("new")
          ),
          ...catalogue.Magnets.filter((item) =>
            item.attributes.includes("new")
          ),
          ...catalogue.Stickers.filter((item) =>
            item.attributes.includes("new")
          ),
        ]);
        break;
      case "product":
        switch (category) {
          case "bookmark":
            setProductList([...catalogue.Bookmarks]);
            break;
          case "magnet":
            setProductList([...catalogue.Magnets]);
            break;
          case "sticker":
            setProductList([...catalogue.Stickers]);
            break;
        }
    }
  }, [catalogue, category, route]);

  return (
    <div className="overflow-scroll">
      <DisplayGrid products={productList} />
    </div>
  );
};

export default CollectionsPage;
