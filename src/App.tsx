import { useState } from "react";
import "./App.css";
import BottomControlPanel from "./BottomControlPanel";
import SearchResultList from "./SearchResultList";

function App() {
  const [sharedData, setSharedData] = useState<string[]>([]);

  const handleDataChange = (data: string) => {
    setSharedData([...sharedData, data]);
  };

  return (
    <div className="container h-screen flex flex-col w-screen">
      <SearchResultList sharedData={sharedData} />
      <BottomControlPanel onDataChange={handleDataChange} />
    </div>
  );
}

export default App;
