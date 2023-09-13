import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Services/FirebaseServices";
import { createContext, useEffect, useState } from "react";

interface IAuthContect {
  loggedIn: boolean;
}

export const AuthContext = createContext<IAuthContect>({ loggedIn: false });

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

  console.log(`rendering app with loggedIn=${loggedIn}`)
    
  return (
    <AuthContext.Provider value={{ loggedIn }}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
