import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import BottomControlPanel from "./BottomControlPanel";
import CenterView from "./CenterView";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <div className="container h-screen flex flex-col w-screen">
      <CenterView/>
      <BottomControlPanel/>
    </div>
  );
}

export default App;
