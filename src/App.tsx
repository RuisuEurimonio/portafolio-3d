import { Canvas } from "@react-three/fiber";
import "./App.css";
import MainScene from "./MainScene";
import { EffectComposer, Noise } from "@react-three/postprocessing";
import LampPost from "./LampPost";
import { useState } from "react";
import { OrbitControls } from "@react-three/drei";

function App() {

  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <Canvas
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
      <MainScene hovered={hovered}/>
      <LampPost customFunction={setHovered} />
      <OrbitControls />
    </Canvas>
  );
}

export default App;
