import { Outlet } from "react-router-dom";
import NavigationBar from "./Components/Navigation/NavigationBar";
import AuthContextProvider from "./Services/AuthContext";
import CartContextProvider from "./Services/CartContext";

function App() {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-kira-bg-start via-kira-bg-through to-kira-bg-end">
      <AuthContextProvider>
        <CartContextProvider>
          <NavigationBar />
          <Outlet />
        </CartContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
