import "./App.css";
import BottomControlPanel from "./BottomControlPanel";
import SearchResultList from "./SearchResultList";

function App() {
  return (
    <div className="container h-screen flex flex-col w-screen">
      <SearchResultList/>
      <BottomControlPanel/>
    </div>
  );
}

export default App;
