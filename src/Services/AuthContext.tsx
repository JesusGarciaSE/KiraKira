import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Services/FirebaseServices";
import { createContext, useContext, useEffect, useState } from "react";

interface IAuthContect {
  loggedIn: boolean;
}

export const AuthContext = createContext<IAuthContect>({ loggedIn: false });
export const useAuth = () => {
    return useContext(AuthContext);
}

interface IAuthContextProvider {
  children: React.ReactNode;
}

export const AuthContextProvider: React.FC<IAuthContextProvider> = ({
  children,
}) => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoggedIn(Boolean(user));
    });
  }, []);
    
  return (
    <AuthContext.Provider value={{ loggedIn }}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
