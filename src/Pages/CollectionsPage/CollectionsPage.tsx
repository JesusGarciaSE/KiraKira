import { useParams } from "react-router-dom";
import DisplayGrid from "../../Components/ItemDisplay/DisplayGrid";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../../Services/FirebaseServices";
import { IItem } from "../../Models/ItemModels";

interface ICollectionsPage {
  route: "new" | "sale" | "product";
}

const CollectionsPage: React.FC<ICollectionsPage> = ({ route }) => {
  const [productList, setProductList] = useState<IItem[]>([]);
  const { category } = useParams();

  useEffect(() => {
    let queryProducts;
    switch (route) {
      case "new":
        queryProducts = query(
          collection(firestore, "Products"),
          where("attributes", "array-contains", "new")
        );
        break;
      case "sale":
        queryProducts = query(
          collection(firestore, "Products"),
          where("onSale", "==", true)
        );
        break;
      case "product":
        queryProducts = query(
          collection(firestore, "Products"),
          where("attributes", "array-contains", category)
        );
        break;

      default:
    }

    const products: IItem[] = [];
    const querySnapshot = getDocs(queryProducts!);
    querySnapshot.then((response) => {
      response.docs.forEach((doc) => {
        console.log(doc.data());
        if (doc.data) {
          products.push(doc.data() as IItem);
        }
      });

      setProductList(products);
    });
  }, [category]);

  return <DisplayGrid products={productList} />;
};

export default CollectionsPage;
