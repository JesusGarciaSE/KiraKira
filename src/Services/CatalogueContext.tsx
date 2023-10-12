import { createContext, useContext, useEffect, useState } from "react";
import { IItem } from "../Models/ItemModels";
import { IParentComponent } from "../Models/ComponentModels";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "./FirebaseServices";

interface Catalogue {
  catalogue: {
    Bookmarks: IItem[];
    Magnets: IItem[];
    Stickers: IItem[];
  };
}

export const CatalogueContext = createContext<Catalogue>({
  catalogue: {
    Bookmarks: [],
    Magnets: [],
    Stickers: [],
  },
});

export const useCatalogue = (): Catalogue => {
  return useContext(CatalogueContext);
};

export const CatalogueContextProvider: React.FC<IParentComponent> = ({
  children,
}) => {
  const [catalogue, setCatalogue] = useState<Catalogue>({
    catalogue: {
      Bookmarks: [],
      Magnets: [],
      Stickers: [],
    },
  });
  useEffect(() => {
    const getCatalogue = async () => {
      const collectionsDocRef = doc(firestore, "Products", "Collections");
      const collectionsDoc = await getDoc(collectionsDocRef);
      collectionsDoc.exists()
        ? setCatalogue(collectionsDoc.data() as Catalogue)
        : console.log("Error getting catalogue");
    };
    getCatalogue();
  }, []);
  return (
    <CatalogueContext.Provider value={catalogue}>
      {children}
    </CatalogueContext.Provider>
  );
};

export default CatalogueContextProvider;
