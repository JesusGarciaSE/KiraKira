import { onAuthStateChanged } from "firebase/auth";
import { auth as firebaseAuth } from "../Services/FirebaseServices";
import { createContext, useContext, useEffect, useState } from "react";
import { IParentComponent } from "../Models/ComponentModels";

interface IAuthContext {
  loggedIn: boolean;
  userId?: string;
}

export const AuthContext = createContext<IAuthContext>({ loggedIn: false });
export const useAuth = (): IAuthContext => {
  return useContext(AuthContext);
};

export const AuthContextProvider: React.FC<IParentComponent> = ({
  children,
}) => {
  const [auth, setAuth] = useState<IAuthContext>({ loggedIn: false });

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (firebaseUser) => {
      const auth = firebaseUser
        ? {
            loggedIn: true,
            userId: firebaseUser.uid,
          }
        : {
            loggedIn: false,
          };
          console.log('app rendered with context', auth)
      setAuth(auth);
    });
  }, []);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
