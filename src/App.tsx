import { Canvas } from "@react-three/fiber";
import "./App.css";

import { EffectComposer, Noise } from "@react-three/postprocessing";
import { useEffect, useState } from "react";
import { OrbitControls, Sparkles } from "@react-three/drei";
import MainScene from "./scenes/MainScene";
import LampPost from "./components/LampPost";
import MyName from "./components/MyName";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Plane from "./pages/Plane";

function App() {

  const [isContinueClicked, setIsContinueClicked] = useState<boolean>(false);
  const [isExitClicked, setIsExitClicked] = useState<boolean>(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Canvas
            camera={{ position: [-24, 8, 22.5], fov: 50 }}
            style={{ width: "100vw", height: "100vh" }}
            onCreated={({ gl }) => {
              gl.setClearColor("#000000");
            }}
            shadows
          >
            <EffectComposer>
              <Noise opacity={0.05} />
            </EffectComposer>
            <ambientLight intensity={0.05} />
            <MainScene isContinueClicked={isContinueClicked} isExitClicked={isExitClicked} setIsExitClicked={setIsExitClicked}/>
            <LampPost customFunctionContinue={setIsContinueClicked} customFunctionExit={setIsExitClicked}/>
            <Sparkles count={100} scale={[10, 10, 10]} speed={0.5} />
            <MyName />
            <OrbitControls /> 
          </Canvas>
        } /> 
        <Route path="/plane" element={<Plane />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
