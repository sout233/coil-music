import "./App.css";
import BottomControlPanel from "./BottomControlPanel";
import CenterView from "./CenterView";

function App() {
  return (
    <div className="container h-screen flex flex-col w-screen">
      <CenterView/>
      <BottomControlPanel/>
    </div>
  );
}

export default App;
