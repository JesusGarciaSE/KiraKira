// import DisplayGrid from "./Components/ItemDisplay/DisplayGrid";
import { Outlet } from "react-router-dom";
import NavigationBar from "./Components/Navigation/NavigationBar";
import AuthContextProvider from "./Services/AuthContext";

function App() {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-kira-bg-start via-kira-bg-through to-kira-bg-end">
      <AuthContextProvider>
        <NavigationBar />
        <Outlet />
      </AuthContextProvider>
    </div>
  );
}

export default App;
