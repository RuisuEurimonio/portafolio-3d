import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Plane from "./pages/Plane";
import MainScene from "./scenes/MainScene";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainScene />} /> 
        <Route path="/plane" element={<Plane />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
