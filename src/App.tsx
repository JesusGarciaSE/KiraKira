// import DisplayGrid from "./Components/ItemDisplay/DisplayGrid";
import NavigationBar from "./Components/Navigation/NavigationBar";
import LoginPage from "./Pages/LoginPage";

function App() {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-kira-bg-start via-kira-bg-through to-kira-bg-end">
      <NavigationBar />
      <LoginPage className="flex-1 w-screen"/>
    </div>
  );
}

export default App;
